import { Link } from 'react-router-dom'
import cn from 'classnames'

import s from './TermsAndConditions.module.scss'

const PAGE_NAME = 'Terms And Conditions'

function TermsAndConditions() {
  document.title = `${PAGE_NAME} | Rural Rising PH`

  return (
    <>
      <section className='pad-block-50'>
        <div className="container flex-col gap-30">
          <h3 className='textGreen-dark'>Terms And Conditions</h3>
          <div className={cn('flex-col gap-10', s.top)}>
            <b>Last updated: <strong>January 26, 2019</strong></b>
            <p>Please read these Terms of Use (“Terms”, “Terms of Use”) carefully before using the <Link className='baseLink' to='/'>ruralrising.com</Link> website (the “Service”) operated by Web Design & Digital Marketing Philippines (“us”, “we”, or “our”).</p>
            <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
            <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Intellectual Property</h5>
            <p>The Service and its original content, features and functionality are and will remain the exclusive property of Web Design & Digital Marketing Philippines and its licensors.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Links To Other Web Sites</h5>
            <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Web Design & Digital Marketing Philippines. Web Design & Digital Marketing Philippines has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Web Design & Digital Marketing Philippines shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
            <p>We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Termination</h5>
            <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            <p>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Disclaimer</h5>
            <p>Your use of the Service is at your sole risk. The Service is provided on an “AS IS” and “AS AVAILABLE” basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Governing Law</h5>
            <p>These Terms shall be governed and construed in accordance with the laws of Philippines without regard to its conflict of law provisions.</p>
            <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>
          </div>
          <div className='flex-col gap-10'>
            <h5>Changes</h5>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
            <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>
            <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.</p>
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

export default TermsAndConditions