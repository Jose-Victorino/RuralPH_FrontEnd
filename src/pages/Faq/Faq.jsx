import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import s from './Faq.module.scss'

const facebookIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 512 512"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
const xIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"/></svg>
const tiktokIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z"/></svg>
const instagramIcon = <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"/><path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"/></svg>
const youtubeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z"/></svg>

const PAGE_NAME = 'FAQs'

function Faq() {
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <section className='pad-block-100'>
        <div className={cn('container', s.grid)}>
          <div className={s.qnaBlock}>
            <h5>What is Rural Rising's role in establishing economic sustainability between farmers and consumers?</h5>
            <p>Rural Rising is a social enterprise dedicated to spurring the rural economy and harnessing the potential of the countryside. It works to bridge the gap between farmers and consumers by providing access to locally grown produce, creating impactful change in rural communities, and investing in agricultural opportunities.</p>
            <p>The organization’s mission is to support rural Democrats running at the state and local levels with the policies and people their communities need to thrive. Rural Rising provides grant assistance through its Rural Innovation Stronger Economy (RISE) Grants program, which offers funding for projects that create high-wage jobs, accelerate business formation, support industry clusters, and more.</p>
            <p>The organization also connects consumers with locally grown produce through its online shop. This helps farmers increase their income by providing them with an additional market for their goods. Additionally, Rural Rising has moved over 2 million kilograms of produce since it was founded in 2018, helping to ensure economic sustainability between farmers and consumers.</p>
          </div>
          <div className={s.qnaBlock}>
            <h5>Are all of your products organic and free of chemicals?</h5>
            <p>Yes, all our products are completely chemical-free. Unlike many imported products available today, we prioritize the exclusion of harmful chemicals and avoid using coatings like ‘light wax’ that are often employed to extend their shelf life.</p>
          </div>
          <div className={s.qnaBlock}>
            <h5>How can I purchase Rural Rising's products?</h5>
            <p>You can purchase directly from our online store <Link className='baseLink' to="http://www.ruriclub.com">www.ruriclub.com</Link> and if you’re within Metro Manila, you can get a product delivered right to your door.  Likewise, we offer a pick up options right at our stores.</p>
          </div>
          <div className={s.qnaBlock}>
            <h5>How can I chat with Rural Rising via Social Media?</h5>
            <p>You can reach out to us directly on social media.</p>
            <ul className={s.socmed}>
              <li>
                <a href="https://www.facebook.com/ruralrisingph/" target='_blank'>{facebookIcon}</a>
              </li>
              <li>
                <a href="https://twitter.com/ruralrisingph" target='_blank'>{xIcon}</a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@ruralrisingph" target='_blank'>{tiktokIcon}</a>
              </li>
              <li>
                <a href="https://www.instagram.com/ruralrisingph/" target='_blank'>{instagramIcon}</a>
              </li>
              <li>
                <a href="https://www.youtube.com/@ruralrisingphilippines1993" target='_blank'>{youtubeIcon}</a>
              </li>
            </ul>
          </div>
          <div className={s.qnaBlock}>
            <h5>How many locations does Rural Rising have?</h5>
            <p>We currently have a total of 3 locations.  To learn more about our locations <Link className='baseLink'>click here.</Link> </p>
          </div>
          <div className={s.qnaBlock}>
            <h5>Does Rural Rising deliver products nationwide?</h5>
            <p>Currently, we only deliver in Metro Manila. We are currently in the works of various providers to expand our locations beyond Metro Manila later this year. Click here to be notified when this happens.</p>
          </div>
          <div className={s.qnaBlock}>
            <h5>How do I become a Rural Rising founding member?</h5>
            <p>You can become a founding member from our online store. <Link className='baseLink' to="http://www.ruriclub.com/membership">www.ruriclub.com/membership</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Faq