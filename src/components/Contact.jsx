const DETAILS = [
  { k: 'Email', v: 'hello@vzlmr.com', href: 'mailto:hello@vzlmr.com' },
  { k: 'Instagram', v: '@vzlmr', href: 'https://instagram.com' },
  { k: 'Based in', v: 'Kuala Lumpur, MY' },
  { k: 'Response', v: 'Within 2 working days' },
]

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="shell contact-grid reveal">
        <div>
          <p className="eyebrow">Enquiries</p>
          <h2>Let&rsquo;s make something worth keeping.</h2>
          <p className="contact-lede">
            Commissions, editorial assignments, prints and the occasional
            workshop. Tell me roughly what you have in mind and when.
          </p>
          <a className="mailto" href="mailto:hello@vzlmr.com">
            hello@vzlmr.com
          </a>
        </div>

        <ul className="detail-list">
          {DETAILS.map((d) => (
            <li key={d.k}>
              <span className="k">{d.k}</span>
              {d.href ? <a href={d.href}>{d.v}</a> : <span>{d.v}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
