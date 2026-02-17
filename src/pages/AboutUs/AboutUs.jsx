import cn from 'classnames'

import Button from '@/components/Button/Button'
import WhatsNew from '@/features/WhatsNew/WhatsNew'

import s from './AboutUs.module.scss'

const PAGE_NAME = 'About Us'

function AboutUs() {
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <section className='pad-block-100'>
        <div className={cn("container flex-col gap-30")}>
          <div className='res-flex-row'>
            <div className={s.left}>
              <ul className={s.statsList}>
                <li>
                  <h5>5+</h5>
                  <p>Years</p>
                </li>
                <li>
                  <h5>4+</h5>
                  <p>Million Kilos Rescued</p>
                </li>
                <li>
                  <h5>39+</h5>
                  <p>Provinces</p>
                </li>
                <li>
                  <h5>4,500+</h5>
                  <p>Partner Farmers</p>
                </li>
                <li>
                  <h5>3,500+</h5>
                  <p>Active Members</p>
                </li>
              </ul>
              <div className={s.mediaCont}></div>
            </div>
            <div className='flex-col gap-15'>
              <h5>Achieving <span className='textGreen'>Rural Prosperity</span></h5>
              <p>Rural Rising Philippines (RuRi) is a collective, non-profit grassroots effort to help distressed Filipino farmers get back on their feet and feed the nation with pride. It aims to do this by doing “Rescue Buys” in areas where there is an over-production of fruits and vegetables, and by paying the farmers above-farm gate prices. RuRi then distributes the rescued produce to its members at below-bagsakan prices. The farmers win and so do the consumers. All fruits and vegetables that are not claimed within 48 hours are automatically donated to hungry communities in the NCR and to various community pantries. No produce goes to waste.</p>
              <p>We believe that when farmers are paid the right price, they have a chance at achieving rural prosperity; that by giving members access to fresh and cheap produce, they would share what they cannot consume to the needy or perhaps create a profitable reseller business; that by channeling all unclaimed or unsold produce to residents in economically depressed communities, their lives are sustained, their souls given hope.</p>
              <p>We do weekly Rescue Buys in towns and cities all over the country. RuRi operates a Vegetable Rescue Center in Baguio City, and three distribution hubs in the NCR. These are RuRi North at Congressional Avenue., Quezon City and RuRi South at the Alabang Town Center, Muntinlupa, and at Avida Towers Centera in Mandaluyong.</p>
            </div>
          </div>
        </div>
      </section>
      <section className='pad-block-100'>
        <div className={cn("container flex-col gap-30")}>
          <div className='res-flex-row'>
            <div className='flex-col gap-15'>
              <p>The conversations at RuRi are led by spouses Ace and Andie Estrada of Baguio City.</p>
              <ul className='list-disc'>
                <li>+40k Members</li>
                <li>175,000 Followers on our Facebook page</li>
              </ul>
              <p>You can send inquiries to <a href="mailto:info@ruralrisingph.com">info@ruralrisingph.com</a></p>
              <p>RuRi is working to erect vegetable tramlines in Benguet, create a water and forest conservation project in Nueva Ecija, and establish community libraries in various farmer communities. It is also working to establish a processing and packaging facility for rescued produce, and the country’s first Rescue Kitchen. We welcome offers of help in whatever form it comes if it would help the farmers and create small but impactful change in the countryside.</p>
            </div>
            <div className={s.mediaCont}></div>
          </div>
        </div>
      </section>
      <section className='pad-block-100'>
        <div className={cn("container flex-col a-center gap-30")}>
          <h2>Important Resources</h2>
          <div className='flex-wrap gap-15'>
            <Button
              color='yellow'
              role='link'
              span
              text='Become a Member'
              onClick={() => navigate('https://ruriclub.com/membership/')}
            />
            <Button
              color='yellow'
              role='link'
              span
              text='Join our FB Group'
              onClick={() => navigate('https://facebook.com/groups/RuRiPh')}
            />
            <Button
              color='yellow'
              role='link'
              span
              text='Watch us on Youtube'
              onClick={() => navigate('https://www.youtube.com/@ruralrisingphilippines1993')}
            />
            <Button
              color='yellow'
              role='link'
              span
              text='Shop for Products'
              onClick={() => navigate('https://ruriclub.com/')}
            />
          </div>
        </div>
      </section>
      <WhatsNew />
    </>
  )
}

export default AboutUs