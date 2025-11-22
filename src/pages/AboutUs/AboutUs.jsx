import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Container from '../../components/Logo/Container';

const AboutUs = () => {
  return (
    <div className="py-10">
      <Container className="bg-white rounded-4xl py-20 px-24">
        <div className="">
          <h2 className="text-secondary text-[56px] font-extrabold">About Us</h2>
          <p className="text-info">
            <div>
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
              personal
            </div>
            <div> packages to business shipments — we deliver on time, every time.</div>
          </p>
        </div>
        <div className="border border-dashed border-gray-300 my-[50px]"></div>

        <div className="">
          <Tabs>
            <TabList>
              <Tab selectedClassName="text-[#5B6A2E] text-2xl font-bold!">Story</Tab>
              <Tab selectedClassName="text-[#5B6A2E] text-2xl font-bold!">Mission</Tab>
              <Tab selectedClassName="text-[#5B6A2E] text-2xl font-bold!">Success</Tab>
              <Tab selectedClassName="text-[#5B6A2E] text-2xl font-bold!">Team & Others</Tab>
            </TabList>

            <TabPanel className="space-y-6">
              {/* Story */}
              <p className="leading-8">
                We started with a simple promise — to make parcel delivery fast, reliable, and
                stress-free. Over the years, our commitment to real-time tracking, efficient
                logistics, and customer-first service has made us a trusted partner for thousands.
                Whether it's a personal gift or a time-sensitive business delivery, we ensure it
                reaches its destination — on time, every time.
              </p>
              <p className="leading-8">
                We started with a simple promise — to make parcel delivery fast, reliable, and
                stress-free. Over the years, our commitment to real-time tracking, efficient
                logistics, and customer-first service has made us a trusted partner for thousands.
                Whether it's a personal gift or a time-sensitive business delivery, we ensure it
                reaches its destination — on time, every time.
              </p>
              <p className="leading-8">
                We started with a simple promise — to make parcel delivery fast, reliable, and
                stress-free. Over the years, our commitment to real-time tracking, efficient
                logistics, and customer-first service has made us a trusted partner for thousands.
                Whether it's a personal gift or a time-sensitive business delivery, we ensure it
                reaches its destination — on time, every time.
              </p>
            </TabPanel>
            <TabPanel className="space-y-6">
              {/* Mission */}
              <p className="leading-8">
                Our mission is to transform the entire parcel delivery experience into one that is
                seamless, reliable, and built on trust, speed, and customer satisfaction. From the
                very beginning, we set out with a single promise: to ensure that every package
                entrusted to us reaches its destination safely, on time, and with a level of care
                that exceeds expectations. In a world where time is precious and every delivery
                matters, we recognize that logistics is not just about moving parcels—it is about
                connecting people, supporting businesses, and creating moments of joy and relief.
                Every delivery we handle represents a commitment to excellence, precision, and
                attention to detail, whether it is a time-sensitive business shipment, a personal
                gift, or an urgent package that someone is waiting for eagerly.
              </p>
              <p className="leading-8">
                At the heart of our mission is the desire to build a logistics ecosystem where
                transparency, accountability, and technology work together to provide complete peace
                of mind for our customers. We employ advanced tracking systems that allow
                individuals and businesses to know the exact location of their parcels in real time,
                offering reassurance and reducing anxiety associated with shipping. Beyond
                technology, our dedicated customer support team stands ready to assist at every
                stage, resolving issues promptly, answering questions, and providing guidance to
                ensure that the delivery process is smooth and stress-free. We believe that a
                successful delivery is not only about speed but also about reliability,
                communication, and the confidence that every parcel will arrive exactly as promised.
              </p>
              <p className="leading-8">
                Our mission extends beyond operational efficiency; it is deeply rooted in the values
                of trust, integrity, and customer-first service. Every decision we make, from route
                optimization to packaging solutions, is driven by the goal of exceeding expectations
                and building lasting relationships. We understand that our work directly impacts
                people’s lives and businesses, and we take that responsibility seriously. Whether it
                is a family sending a heartfelt gift, a small business delivering a product to a
                valued customer, or a large corporation relying on timely shipments to maintain
                operations, we approach each delivery with the same level of care and commitment. By
                doing so, we aim to not only deliver parcels but also to deliver confidence,
                reliability, and peace of mind to every customer who chooses our service.
              </p>
            </TabPanel>
            <TabPanel className="space-y-6">
              {/* Success */}
              <p>
                <strong>A Success Story: Delivering Trust, One Parcel at a Time</strong>
              </p>

              <p>
                Our mission has always been simple: to make parcel delivery fast, reliable, and
                stress-free. Yet, the true measure of our success lies in the stories of our
                customers whose lives and businesses we impact every day. One such story stands out,
                reflecting the heart of what we do.
              </p>

              <p>
                Recently, a small business owner from Chittagong reached out with a critical
                request: she needed to deliver a batch of custom products to multiple clients across
                different districts within 24 hours. These deliveries were time-sensitive and
                essential to maintaining her reputation. Understanding the urgency, our team
                immediately coordinated, optimizing routes and ensuring each parcel was handled with
                care.
              </p>

              <p>
                With our advanced real-time tracking system, the business owner could follow the
                journey of her packages, receiving timely updates and complete transparency. Our
                dedicated support team was also on hand, addressing questions and resolving minor
                issues before they could affect delivery. By the end of the day, every parcel
                reached its destination on time, intact, and with full confirmation to the
                recipients.
              </p>

              <p>
                The business owner was delighted—her clients were impressed by the efficiency, and
                she successfully met her commitments without stress. This experience exemplifies our
                commitment to more than just speed; it reflects reliability, precision, and
                customer-first service.
              </p>

              <p>
                Every delivery we handle carries trust and responsibility. Whether it’s a personal
                gift or an urgent business shipment, we ensure it arrives safely, on time, and with
                care. Success, for us, is seeing our customers’ confidence grow, knowing they can
                rely on us for every parcel. Through stories like this, we continue to build
                stronger relationships, deliver peace of mind, and fulfill our promise of
                transforming the delivery experience—one package at a time.
              </p>
            </TabPanel>
            <TabPanel className="space-y-6">
              {/* Team & Others */}
              <p className="leading-8">
                Our team is the backbone of our success, bringing together a diverse group of
                talented individuals who share a common passion for excellence in parcel delivery.
                Each member, from logistics planners to customer support specialists, works
                tirelessly to ensure that every package reaches its destination safely and on time.
                Beyond our core team, we collaborate with trusted partners, drivers, and service
                providers, creating a seamless network that spans cities and regions. This
                collective effort allows us to maintain the highest standards of reliability,
                efficiency, and customer satisfaction. We believe in nurturing a culture of
                innovation, accountability, and continuous learning, empowering our team to adapt to
                challenges and exceed expectations. Together, our people and partners embody the
                spirit of dedication and care that defines our service, making every delivery not
                just a task, but a promise fulfilled. Our team’s commitment ensures that whether
                it’s a small personal gift or a critical business shipment, every parcel receives
                the attention it deserves, reinforcing the trust our customers place in us every
                day.
              </p>
            </TabPanel>
          </Tabs>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
