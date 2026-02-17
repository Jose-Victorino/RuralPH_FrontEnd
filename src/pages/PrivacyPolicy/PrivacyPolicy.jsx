import { Link } from 'react-router-dom'
import cn from 'classnames'

import s from './PrivacyPolicy.module.scss'

const PAGE_NAME = 'Privacy Policy'

function PrivacyPolicy() {
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <section className='pad-block-50'>
        <div className="container flex-col gap-30">
          <h3 className='textGreen-dark'>Privacy Policy</h3>
          <div className={cn('flex-col gap-10', s.top)}>
            <b>Last updated: <strong>January 26, 2019</strong></b>
            <p>Web Design & Digital Marketing Philippines (“us”, “we”, or “our”) operates the Web Design & Digital Marketing Philippines website (the “Service”).</p>
            <p>This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service.</p>
            <p>We will not use or share your information with anyone except as described in this Privacy Policy.</p>
            <p>We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at <Link className='baseLink' to='/'>ruralrisingph.com</Link></p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Information Collection And Use</h5>
            <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information (“Personal Information”) may include, but is not limited to:</p>
            <ul className='list-disc'>
              <li>Name</li>
              <li>Email Address</li>
              <li>Telephone number</li>
              <li>Address</li>
            </ul>
          </div>
          <div className='flex-col gap-10'>
            <h5>Log Data</h5>
            <p>We collect information that your browser sends whenever you visit our Service (“Log Data”). This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Service Providers</h5>
            <p>We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>
            <p>These third parties have access to your Personal Information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Links To Other Sites</h5>
            <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party’s site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
            <p>We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Children’s Privacy</h5>
            <p>Our Service does not address anyone under the age of 18 (“Children”).</p>
            <p>We do not knowingly collect personally identifiable information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us. If we discover that a child under 18 has provided us with Personal Information, we will delete such information from our servers immediately.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Compliance With Laws</h5>
            <p>We will disclose your Personal Information where required to do so by law or subpoena.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Changes To This Privacy Policy</h5>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Contact Us</h5>
            <p>If you have any questions about this Privacy Policy, please <Link className='baseLink' to="/contact-us">contact us</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy