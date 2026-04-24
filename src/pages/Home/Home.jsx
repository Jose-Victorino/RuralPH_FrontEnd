import { useState } from 'react'
import { Link } from 'react-router'
import cn from 'classnames'
import useDocumentTitle from '@/hooks/useDocumentTitle'

import { scrollReset } from '@/library/Util'
import Button from '@/components/Button/Button'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'

import s from './Home.module.scss'

import headerVideo from 'uploads/video-banner.mp4'
import spousesImg from 'uploads/rural-philippines-e1682368256444.png'
import campMingan from 'uploads/campmingan.jpg'
import Marketplace from 'uploads/Marketplace.jpg'
import resources from 'uploads/resources.jpg'
import capacityBuilding from 'uploads/capacity-building.jpg'
import tourism from 'uploads/Tourism.jpg'

const VIDEOS = [
  {
    id: 1,
    title: 'We receive a recognition',
    description: 'Find out how our pioneering work got recognized and awarded at the Ginebra Ako Year 4 Awards. Learn more about what this means for Rural Rising and all farmers across the country.',
    videoId: '661363282',
    thumbnailLink: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1337236120-39cf68f9519e4626f52d438f2e37f4df73472db5d28386a9cbb4c27742d175ea-d_295x166%3Fregion%3Dus&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
  },
  {
    id: 2,
    title: 'An Angel visits the farmers of Licab',
    description: 'Follow Rural Rising’s inspiring story of how they joined forces with Angel Locsin to bring aid and hope to the farmers of Licab. See how you can get involved and make a difference now.',
    videoId: '627961587',
    thumbnailLink: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1270279023-2b4eb3835e4d089bdcf0c5ebb5647e57b0b37c35269b0b3c3_295x166%3Fregion%3Dus&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
  },
  {
    id: 3,
    title: 'Preserving amazing earth and vital water:',
    description: 'Learn how Rural Rising works with the local government and other key stakeholders to help farmers and their communities in Mt. Mingan preserve their vital water source and protect the environment.',
    videoId: '625277165',
    thumbnailLink: 'https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1267612408-4bf803e31de50879061009aba7ce3cb350e249c63411a50ce_295x166%3Fregion%3Dus&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png',
  },
]

function Home() {
  const [open, setOpen] = useState(false)
  
  useDocumentTitle('Rural Rising PH')
  
  return (
    <>
      {open !== false && <VideoPlayer onClose={() => setOpen(false)} videoId={open} />}
      <section className={s.hero}>
        <div className='container flex a-center' style={{height: '100%'}}>
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
        <div className={s.headerDivider}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>
      <section className={cn(s.stats, 'pad-block-80')}>
        <div className="container">
          <ul className={s.statsList}>
            <li data-ros='flip-left'>
              <h2>5+</h2>
              <p>Years</p>
            </li>
            <li data-ros='flip-left'>
              <h2>4+</h2>
              <p>Million Kilos Rescued</p>
            </li>
            <li data-ros='flip-left'>
              <h2>39+</h2>
              <p>Provinces</p>
            </li>
            <li data-ros='flip-left'>
              <h2>4,500+</h2>
              <p>Partner Farmers</p>
            </li>
            <li data-ros='flip-left'>
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
          <button data-ros='fade-left' className={s.thumbnailCont} onClick={() => setOpen('625271895')}>
            <img className={s.img} src='https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F1267606957-40b5df88edba9975eedd7d56c8789b18c573e355fb95c2ba9_295x166%3Fregion%3Dus&src1=http%3A%2F%2Ff.vimeocdn.com%2Fp%2Fimages%2Fcrawler_play.png' alt='thumbnail' />
          </button>
        </div>
      </section>
      <section className='pad-block-100'>
        <div className='container res-flex-row'>
          <div>
            <img data-ros='fade-right' className={s.img} loading="lazy" src={spousesImg} alt='img'/>
          </div>
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
      <section className={s.section2}>
        <div className={s.dividerTop}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"></path>
          </svg>
        </div>
        <div className='container res-flex-row'>
          <div>
            <img data-ros='fade-right' className={s.img} src={campMingan} alt="Camp Mingan" />
          </div>
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
        <div className={s.dividerBottom}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z"></path>
          </svg>
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
                  <Link to='/about-us' onClick={() => scrollReset()}>Learn More</Link>
                </div>
              </li>
              <li data-ros='flip-left'>
                <div className={s.overlay} />
                <img className={s.img} src={capacityBuilding} alt='Capacity Building'/>
                <div className={s.approachesInner}>
                  <h5>Capacity Building</h5>
                  <Link to='/our-journey' onClick={() => scrollReset()}>Learn More</Link>
                </div>
              </li>
              <li data-ros='flip-left'>
                <div className={s.overlay} />
                <img className={s.img} src={tourism} alt='Tourism'/>
                <div className={s.approachesInner}>
                  <h5>Tourism</h5>
                  <Link to='/our-journey' onClick={() => scrollReset()}>Learn More</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className='pad-block-100'>
        <div data-ros='fade-down' className='container flex-col gap-20'>
          <h2 data-ros='fade-down' className='text-center'>What's New at <span className='textGreen'>Rural Rising</span></h2>
          <ul className={s.gridList}>
            {VIDEOS.map((vid) => (
              <li data-ros='fade-down' key={vid.id}>
                <button className={s.thumbnailCont} onClick={() => setOpen(vid.videoId)}>
                  <img src={vid.thumbnailLink} alt="thumbnail" />
                </button>
                <div className={s.content}>
                  <h5 className='textYellow'>{vid.title}</h5>
                  <p>{vid.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button
            text='View More'
            color='yellow'
            span
            role='link'
            style={{alignSelf: 'center'}}
            to='/in-the-news'
            onClick={() => scrollReset()}
          />
        </div>
      </section>
    </>
  )
}

export default Home