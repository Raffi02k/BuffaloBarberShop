import { useEffect,useRef,useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../content/services';
import { Icon } from './Icon';

type FormState='idle'|'sending'|'sent'|'demo'|'error';
export function ContactForm() {
  const [state,setState]=useState<FormState>('idle');
  const [message,setMessage]=useState('');
  const controller=useRef<AbortController|null>(null);
  useEffect(() => () => controller.current?.abort(),[]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(state==='sending') return;
    const form=event.currentTarget;
    if(!form.reportValidity()) return;
    const fields=new FormData(form);
    setState('sending'); setMessage('');
    const abort=new AbortController(); controller.current=abort;
    const timeout=window.setTimeout(() => abort.abort(),25000);
    try {
      const base=(import.meta.env.VITE_API_BASE_URL||'').replace(/\/$/,'');
      const response=await fetch(`${base}/api/contact`,{
        method: 'POST',signal: abort.signal,headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(fields.get('name')||'').trim(),
          email: String(fields.get('email')||'').trim(),
          phone: String(fields.get('phone')||'').trim(),
          service: String(fields.get('service')||''),
          message: String(fields.get('message')||'').trim(),
          website: String(fields.get('website')||''),
          consent: fields.get('consent')==='on'
        })
      });
      if(response.status===429) throw new Error('För många försök. Vänta en stund och försök igen.');
      if(!response.ok) throw new Error('Meddelandet kunde inte skickas. Kontrollera fälten och att backend är startad, eller kontakta oss via bokningen.');
      const result: { status?: string; delivered?: boolean; }=await response.json();
      if(result.status==='demo'&&result.delivered===false) {
        setState('demo'); setMessage('Testläge: formuläret fungerar, men inget mejl har skickats. SMTP behöver konfigureras för riktig leverans.');
      } else if(result.status==='sent'&&result.delivered===true) {
        setState('sent'); setMessage('Tack! Ditt meddelande har skickats till salongen.'); form.reset();
      } else throw new Error('Vi kunde inte bekräfta att meddelandet skickades. Försök igen senare.');
    } catch(error) {
      setState('error');
      setMessage(error instanceof Error&&error.name!=='AbortError'? error.message:'Anropet tog för lång tid. Kontrollera anslutningen och försök igen.');
    } finally { window.clearTimeout(timeout); controller.current=null; }
  }
  return <section className="contact-form-section container section-space" id="meddelande" aria-labelledby="form-title">
    <div><p className="eyebrow">En fråga innan stolen?</p><h2 id="form-title">LÅT OSS <span className="accent">PRATA.</span></h2>
      <p className="content-note">Formuläret gäller frågor. Din tid bokar du i det externa bokningssystemet.</p></div>
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>Namn *<input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
        <label>E-post *<input type="email" name="email" autoComplete="email" required maxLength={254} /></label>
      </div>
      <div className="form-row">
        <label>Telefon<input type="tel" name="phone" autoComplete="tel" maxLength={40} /></label>
        <label>Vad gäller frågan?<select name="service"><option value="">Välj tjänst</option>{services.map(service => <option key={service.slug} value={service.title}>{service.title}</option>)}</select></label>
      </div>
      <label>Meddelande *<textarea name="message" required minLength={10} maxLength={4000} rows={5} /></label>
      <div className="form-honeypot" aria-hidden="true"><label>Webbplats<input name="website" tabIndex={-1} autoComplete="off" maxLength={200} /></label></div>
      <label className="form-consent"><input type="checkbox" name="consent" required /><span>Jag godkänner att mina uppgifter används för att hantera min fråga. Läs <Link to="/integritet">integritetsinformationen</Link>.</span></label>
      <button type="submit" className="button button-primary" disabled={state==='sending'}><span>{state==='sending'? 'Skickar…':'Skicka meddelande'}</span><Icon name="arrow" /></button>
      <p className={`form-feedback form-feedback-${state}`} role={state==='error'? 'alert':'status'} aria-live="polite">{message}</p>
    </form>
  </section>;
}
