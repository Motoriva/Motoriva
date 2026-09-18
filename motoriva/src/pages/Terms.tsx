import { useLanguage } from '../context/LanguageContext';

export default function Terms() {
  const { lang } = useLanguage();
  const de = lang === 'de';

  const sections = de ? [
    ['§1 Geltungsbereich', `Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Bestellungen und Käufe über den Online-Shop MOTORIVA.

Anbieter:
MOTORIVA
Hirschengässli 4
3860 Meiringen
Schweiz
E-Mail: motoriva.swiss@gmail.com

Mit dem Absenden einer Bestellung erklärt sich der Kunde mit diesen AGB einverstanden.`],
    ['§2 Produkte', `MOTORIVA verkauft Automotive- und Motorrad-Wanddekorationen sowie weitere Fahrzeug-inspirierte Dekorationsartikel.

Die Produkte können optisch von den auf der Website dargestellten Bildern abweichen. Geringfügige Unterschiede in Farbe, Oberfläche, Material oder Details stellen keinen Mangel dar, sofern die wesentlichen Produkteigenschaften erhalten bleiben.

Unsere Produkte sind Dekorationsartikel und nicht für den Einsatz als funktionierende Fahrzeugteile im Strassenverkehr bestimmt.`],
    ['§3 Bestellung und Vertragsabschluss', `Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot dar.

Der Kunde gibt durch das Absenden einer Bestellung ein verbindliches Angebot zum Kauf der ausgewählten Produkte ab.

Ein Kaufvertrag kommt erst zustande, wenn MOTORIVA die Bestellung bestätigt oder die erfolgreiche Zahlung bestätigt wurde.

MOTORIVA behält sich das Recht vor, Bestellungen abzulehnen oder zu stornieren, insbesondere bei technischen Fehlern, falschen Preisangaben oder nicht verfügbaren Produkten.`],
    ['§4 Preise', `Alle Preise sind in Schweizer Franken (CHF) angegeben, sofern nicht anders angegeben.

Versandkosten werden während des Bestellvorgangs separat ausgewiesen, sofern sie nicht ausdrücklich im Produktpreis enthalten sind.

MOTORIVA behält sich das Recht vor, Preise jederzeit zu ändern. Für eine bereits abgeschlossene Bestellung gilt der zum Zeitpunkt der Bestellung angezeigte Preis.`],
    ['§5 Zahlung', `Die verfügbaren Zahlungsmethoden werden im Checkout angezeigt.

Bei Zahlung mit Kreditkarte, Debitkarte oder anderen elektronischen Zahlungsmethoden wird die Zahlung über einen externen Zahlungsdienstleister (Stripe) verarbeitet.

Kreditkarten- oder Zahlungsdaten werden von MOTORIVA nicht gespeichert.

Eine Bestellung gilt erst als bezahlt und bestätigt, nachdem die erfolgreiche Zahlung durch den jeweiligen Zahlungsdienstleister bestätigt wurde.

Bei abgelehnten oder fehlgeschlagenen Zahlungen wird die Bestellung nicht als bezahlt bestätigt.`],
    ['§6 Lieferung und Versand', `MOTORIVA liefert innerhalb der Schweiz sowie gegebenenfalls in weitere Länder.

Die Lieferzeiten sind abhängig vom Produkt, Lagerbestand, Versanddienstleister und Zielland.

Angegebene Lieferzeiten sind Richtwerte und können sich in Ausnahmefällen verlängern.

Bei internationalen Lieferungen können zusätzliche Zollgebühren, Einfuhrsteuern oder andere Gebühren entstehen. Diese sind, sofern nicht ausdrücklich anders angegeben, vom Kunden zu tragen.`],
    ['§7 Rückgabe und Widerruf', `In der Schweiz besteht grundsätzlich kein allgemeines gesetzliches Widerrufsrecht für Online-Bestellungen.

MOTORIVA bietet freiwillige Rückgaben oder Umtausch gemäss den auf der Website veröffentlichten Rückgabebedingungen an.

Personalisierte, speziell angefertigte oder auf Bestellung produzierte Produkte können von einer freiwilligen Rückgabe ausgeschlossen sein, sofern dies vor dem Kauf klar kommuniziert wurde.`],
    ['§8 Garantie und beschädigte Produkte', `MOTORIVA legt grossen Wert auf eine sorgfältige Qualitätskontrolle.

Sollte ein Produkt beschädigt, fehlerhaft oder falsch geliefert werden, muss der Kunde MOTORIVA möglichst schnell nach Erhalt der Lieferung kontaktieren und geeignete Fotos des Problems sowie die Bestellnummer bereitstellen.

Je nach Einzelfall kann MOTORIVA eine Reparatur, einen Ersatz, einen Preisnachlass oder eine Rückerstattung anbieten.

Für neue Produkte gilt eine freiwillige Garantie von 90 Tagen gegen Material- und Verarbeitungsfehler.

Normale Abnutzung, unsachgemässe Montage, falsche Verwendung, Veränderungen am Produkt oder Schäden durch äussere Einflüsse sind von der Garantie ausgeschlossen.`],
    ['§9 Montage und Sicherheit', `Der Kunde ist für die fachgerechte und sichere Montage der Produkte verantwortlich.

Wanddekorationen und Fahrzeugteile können je nach Produktgewicht und Grösse eine geeignete Wandbefestigung benötigen.

MOTORIVA übernimmt keine Haftung für Schäden, die durch unsachgemässe Montage, ungeeignete Befestigungsmaterialien oder eine nicht ausreichend tragfähige Wand entstehen.

Der Kunde muss vor der Montage sicherstellen, dass die Wand und das verwendete Befestigungssystem für das Gewicht des Produkts geeignet sind.`],
    ['§10 Haftung', `MOTORIVA haftet im Rahmen der gesetzlichen Bestimmungen.

Eine Haftung für Schäden, die durch unsachgemässe Verwendung, Montage oder Veränderung eines Produkts entstehen, wird soweit gesetzlich zulässig ausgeschlossen.

MOTORIVA haftet nicht für Verzögerungen oder Leistungsausfälle, die durch Ereignisse ausserhalb des eigenen Einflussbereichs verursacht werden.`],
    ['§11 Geistiges Eigentum', `Alle Inhalte auf der Website von MOTORIVA, insbesondere Logos, Texte, Bilder, Designs und Grafiken, sind urheberrechtlich oder anderweitig geschützt.

Eine Verwendung, Vervielfältigung oder Weitergabe ohne vorherige schriftliche Zustimmung von MOTORIVA ist nicht gestattet.

Markennamen und Logos von Fahrzeugherstellern gehören den jeweiligen Rechteinhabern. Es besteht keine offizielle Verbindung zwischen MOTORIVA und den jeweiligen Fahrzeugherstellern.`],
    ['§12 Datenschutz', `Die Verarbeitung personenbezogener Daten erfolgt gemäss der Datenschutzerklärung von MOTORIVA, die auf der Website separat abrufbar ist.`],
    ['§13 Änderungen der AGB', `MOTORIVA behält sich das Recht vor, diese AGB jederzeit anzupassen. Für bereits abgeschlossene Bestellungen gelten die zum Zeitpunkt der Bestellung gültigen AGB.`],
    ['§14 Anwendbares Recht und Gerichtsstand', `Es gilt Schweizer Recht, soweit keine zwingenden gesetzlichen Bestimmungen entgegenstehen. Der Gerichtsstand richtet sich nach den gesetzlichen Bestimmungen.`],
    ['§15 Kontakt', `Bei Fragen zu diesen AGB oder einer Bestellung kontaktieren Sie uns bitte:

MOTORIVA
E-Mail: motoriva.swiss@gmail.com
Adresse: Hirschengässli 4, 3860 Meiringen, Schweiz`],
  ] : [
    ['§1 Scope', `These General Terms and Conditions (GTC) apply to all orders and purchases made through the MOTORIVA online shop.

Provider:
MOTORIVA
Hirschengässli 4
3860 Meiringen
Switzerland
Email: motoriva.swiss@gmail.com

By submitting an order, the customer agrees to these GTC.`],
    ['§2 Products', `MOTORIVA sells automotive and motorcycle wall decorations and other vehicle-inspired decorative items.

Products may visually differ from the images shown on the website. Minor differences in colour, surface, material or details do not constitute a defect, provided the essential product properties are maintained.

Our products are decorative items and are not intended for use as functional vehicle parts in road traffic.`],
    ['§3 Order and Contract Formation', `The display of products in the online shop does not constitute a legally binding offer.

By submitting an order, the customer makes a binding offer to purchase the selected products.

A purchase contract is only concluded when MOTORIVA confirms the order or successful payment has been confirmed.

MOTORIVA reserves the right to reject or cancel orders, particularly in the event of technical errors, incorrect prices or unavailable products.`],
    ['§4 Prices', `All prices are stated in Swiss Francs (CHF) unless otherwise indicated.

Shipping costs are shown separately during the ordering process unless expressly included in the product price.

MOTORIVA reserves the right to change prices at any time. The price displayed at the time of the order applies to completed orders.`],
    ['§5 Payment', `Available payment methods are displayed in the checkout.

For payments by credit card, debit card or other electronic payment methods, payment is processed via an external payment service provider (Stripe).

MOTORIVA does not store credit card or payment data.

An order is only considered paid and confirmed after successful payment has been confirmed by the respective payment service provider.

Rejected or failed payments will not result in a confirmed order.`],
    ['§6 Delivery and Shipping', `MOTORIVA delivers within Switzerland and, where applicable, to other countries.

Delivery times depend on the product, stock, shipping service provider and destination country.

Stated delivery times are estimates and may be extended in exceptional cases.

For international deliveries, additional customs duties, import taxes or other charges may apply. These are the responsibility of the customer unless expressly stated otherwise.`],
    ['§7 Returns and Withdrawal', `In Switzerland, there is generally no statutory right of withdrawal for online orders.

MOTORIVA offers voluntary returns or exchanges in accordance with the return conditions published on the website.

Personalised, custom-made or made-to-order products may be excluded from voluntary returns, provided this was clearly communicated before purchase.`],
    ['§8 Warranty and Damaged Products', `MOTORIVA places great importance on thorough quality control.

If a product arrives damaged, defective or incorrect, the customer must contact MOTORIVA as soon as possible after receiving the delivery, providing appropriate photos of the issue and the order number.

Depending on the individual case, MOTORIVA may offer a repair, replacement, price reduction or refund.

A voluntary warranty of 90 days against material and manufacturing defects applies to new products.

Normal wear and tear, improper installation, incorrect use, modifications to the product or damage caused by external influences are excluded from the warranty.`],
    ['§9 Installation and Safety', `The customer is responsible for the proper and safe installation of the products.

Wall decorations and vehicle parts may require appropriate wall fixings depending on the weight and size of the product.

MOTORIVA accepts no liability for damage caused by improper installation, unsuitable fixing materials or walls that are insufficiently load-bearing.

Before installation, the customer must ensure that the wall and fixing system used are suitable for the weight of the product.`],
    ['§10 Liability', `MOTORIVA is liable within the framework of statutory provisions.

Liability for damage caused by improper use, installation or modification of a product is excluded to the extent permitted by law.

MOTORIVA is not liable for delays or failures caused by events outside its control.`],
    ['§11 Intellectual Property', `All content on the MOTORIVA website, in particular logos, texts, images, designs and graphics, is protected by copyright or other rights.

Use, reproduction or distribution without prior written consent from MOTORIVA is not permitted.

Brand names and logos of vehicle manufacturers belong to their respective rights holders. There is no official connection between MOTORIVA and the respective vehicle manufacturers.`],
    ['§12 Privacy', `The processing of personal data is carried out in accordance with the MOTORIVA Privacy Policy, which is available separately on the website.`],
    ['§13 Changes to GTC', `MOTORIVA reserves the right to amend these GTC at any time. The GTC valid at the time of the order apply to already completed orders.`],
    ['§14 Applicable Law and Jurisdiction', `Swiss law applies, unless mandatory statutory provisions dictate otherwise. Jurisdiction is determined by statutory provisions.`],
    ['§15 Contact', `For questions about these GTC or an order, please contact us:

MOTORIVA
Email: motoriva.swiss@gmail.com
Address: Hirschengässli 4, 3860 Meiringen, Switzerland`],
  ];

  return (
    <section className="pt-28 pb-24 max-w-3xl mx-auto px-4">
      <p className="text-[#e02020] text-xs tracking-[.25em]">{de ? 'RECHTLICHES' : 'LEGAL'}</p>
      <h1 className="text-5xl mt-3">{de ? 'AGB' : 'Terms & Conditions'}</h1>
      <p className="text-gray-500 text-sm mt-3">{de ? 'Stand: September 2026' : 'As of: September 2026'}</p>
      {sections.map(([title, body]) => (
        <article className="mt-10" key={title}>
          <h2 className="text-2xl">{title}</h2>
          <p className="text-gray-400 leading-relaxed mt-3 whitespace-pre-line">{body}</p>
        </article>
      ))}
    </section>
  );
}