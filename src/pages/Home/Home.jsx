import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import Button from '@/components/Button/Button'
import WhatsNew from '@/features/WhatsNew/WhatsNew'

import s from './Home.module.scss'

import headerVideo from 'uploads/video-banner.mp4'
import campMingan from 'uploads/campmingan.jpg'
import Marketplace from 'uploads/Marketplace.jpg'
import resources from 'uploads/resources.jpg'
import capacityBuilding from 'uploads/capacity-building.jpg'
import tourism from 'uploads/Tourism.jpg'

import { supabase } from '@/supabase-client'

function Home() {
  const [users, setUsers] = useState([])

  document.title = `Rural Rising PH`

  const fetchUsers = async () => {
    const { err, data } = await supabase.from('users').select("*")

    if(err){
      console.error("Error getting task: ", err.message)
      return
    }

    setUsers(data)
  }
  console.log(users);
  
  
  useEffect(() => {
    fetchUsers()
  }, [])
  
  return (
    <>
      <section className={s.hero}>
        <div className='container flex a-center'>
          <video
            className={s.headerVideo}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={headerVideo}/>
          </video>
          <div data-ros='fade-right' className={s.content}>
            <div className='flex-col gap-10'>
              <h1>Growing Together</h1>
              <h2>Fresh, Local Produce That Supports Filipino Farmers</h2>
              <p>By choosing Ruri, you’re not just buying fresh, seasonal produce—you’re supporting sustainable farming and empowering rural communities. Together, we’re growing a brighter future for Filipino agriculture.</p>
            </div>
            <Button
              text='Join Ruri Club'
              color='yellow'
              size='lg'
              span
              role='link'
              to='https://ruriclub.com/pages/membership'
            />
          </div>
        </div>
      </section>
      <section className={cn(s.stats, 'pad-block-80')}>
        <div className="container">
          <ul className={s.statsList}>
            <li data-ros='zoom-in'>
              <h2>5+</h2>
              <p>Years</p>
            </li>
            <li data-ros='zoom-in'>
              <h2>4+</h2>
              <p>Million Kilos Rescued</p>
            </li>
            <li data-ros='zoom-in'>
              <h2>39+</h2>
              <p>Provinces</p>
            </li>
            <li data-ros='zoom-in'>
              <h2>4,500+</h2>
              <p>Partner Farmers</p>
            </li>
            <li data-ros='zoom-in'>
              <h2>3,500+</h2>
              <p>Active Members</p>
            </li>
          </ul>
        </div>
      </section>
      <section className='pad-block-100'>
        <div className='container res-flex-row'>
          <div data-ros='fade-right' className='flex-col gap-15'>
            <h4>Mutual Accountability</h4>
            <p>In low-income countries such as the Philippines, investment in agriculture has been proven to have a greater impact on poverty reduction than in any other sector. This is because it offers the most direct way for rural workers to benefit from their main assets: land and labor.</p>
            <p>Development cooperation focusing on rural development is a very important component for poverty reduction for the following reasons:</p>
            <ul className='list-disc'>
              <li>Over a third of the rural inhabitants in the Philippines are poverty-stricken.</li>
              <li>Urban poor are mainly migrant workers and farmers who came from rural areas.</li>
              <li>Improved rural areas present a safety net against the lack of job opportunities in cities.</li>
            </ul>
          </div>
          <div data-ros='fade-left' className={s.imgCont}></div>
        </div>
      </section>
      <section className='pad-block-100'>
        <div className='container res-flex-row'>
          <div data-ros='fade-right' className={s.imgCont}></div>
          <div data-ros='fade-left' className='flex-col gap-15'>
            <p>Farmers have to contend with a general dearth of resources or knowledge to invest in the land, inability to effectively cope with conflicts and climate change, reluctance to embrace new technologies that would unlock new markets that would boost their productivity and income.</p>
            <p>To achieve a realistic and sustainable country-wide development, the agriculture sector must build on the efforts of the government and strengthen its programs simultaneously deliver food security, environmental sustainability, and economic opportunity through a coordinated effort by all stakeholders.</p>
          </div>
        </div>
      </section>
      <section className='pad-block-100'>
        <div className={"container flex-col gap-30"}>
          <h2 data-ros='fade-down' className='text-center'>Be Part of the Story</h2>
          <div className='res-flex-row'>
            <div data-ros='fade-right'>
              <h5>Misson</h5>
              <p>To enhance the economic viability of local agriculture by removing the layers of middlemen between producers and consumers through fair and sustainable market practice.</p>
            </div>
            <div data-ros='fade-left'>
              <h5>Vision</h5>
              <p>To become the biggest community-supported agriculture organization in the world.</p>
            </div>
          </div>
          <div data-ros='fade-up' className='flex-col gap-10'>
            <h5>Transparency</h5>
            <p>RuRi is a Validated Organization of global grant-making organization Charities Aid Foundation (CAF) America.</p>
            <p>RuRi accepts donations that will help sustain the ongoing Rescue Buys, to acquire additional food processing and preservation equipment, and for training more farmers on sustainable and regenerative agriculture. We welcome opportunities to partner with companies, schools  organizations on CSR/ESG/Sustainability.</p>
            <p>We are happy to accept donations via GCash (09175017787 Armando II), Bank Transfer  United Bank, Maginhawa Branch, Account No 545-11-000128-5, Rural Rising Inc.)</p>
            <p>For USA based donors, you can make a tax deductible donation by clicking the button below</p>
            <Button
              text='Make a Donation through CAF'
              color='yellow'
              span
              role='link'
              style={{alignSelf: 'center'}}
              to='https://cafa.iphiview.com/cafa/AccountInformation/tabid/495/dispatch/accountselection_id$450980_hash$424008be42b633899ebd723198fc60651f28573a/Default.aspx'
            />
          </div>
        </div>
      </section>
      <section className={cn(s.section2, 'pad-block-120')}>
        <div className='container res-flex-row'>
          <img data-ros='fade-right' className={s.img} src={campMingan} alt="Camp Mingan" />
          {/* <div data-ros='fade-right' className={s.imgCont}></div> */}
          <div data-ros='fade-left' className='flex-col gap-15'>
            <h2 className='lh-1'><span className='textYellow'>Discover Camp Mingan:</span> Where Nature and Community Thrive</h2>
            <p>A conservation park that’s transforming rural communities through sustainable practices, environmental stewardship, and collaborative action.</p>
            <p>At Rural Rising, we’re proud to bring Camp Mingan to life—a space where conservation meets community. Through sustainable agriculture, service-learning programs, and community partnerships, Camp Mingan is creating opportunities for farmers, families, and future generations. Join us in building a brighter, more sustainable future.</p>
            <Button
              text='Explore Camp Mingan'
              color='yellow'
              span
              role='link'
              to='https://campmingan.com/'
            />
          </div>
        </div>
      </section>
      <section className='pad-block-100'>
        <div className="container flex-col gap-15">
          <h2 data-ros='fade-down' className='text-center'>Approaches to Rural Sustainability</h2>
          <div>
            <ul className={s.approachesList}>
              <li data-ros='flip-left'>
                <div className={s.overlay} />
                <img className={s.img} src={Marketplace} alt='Marketplace'/>
                <div className={s.approachesInner}>
                  <h5>Marketplace</h5>
                  <Link to='https://ruriclub.com/'>Learn More</Link>
                </div>
              </li>
              <li data-ros='flip-left'>
                <div className={s.overlay} />
                <img className={s.img} src={resources} alt='Resources'/>
                <div className={s.approachesInner}>
                  <h5>Resources</h5>
                  <Link to='/about-us'>Learn More</Link>
                </div>
              </li>
              <li data-ros='flip-left'>
                <div className={s.overlay} />
                <img className={s.img} src={capacityBuilding} alt='Capacity Building'/>
                <div className={s.approachesInner}>
                  <h5>Capacity Building</h5>
                  <Link to='/our-journey'>Learn More</Link>
                </div>
              </li>
              <li data-ros='flip-left'>
                <div className={s.overlay} />
                <img className={s.img} src={tourism} alt='Tourism'/>
                <div className={s.approachesInner}>
                  <h5>Tourism</h5>
                  <Link to='/our-journey'>Learn More</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <WhatsNew />
    </>
  )
}

export default Home