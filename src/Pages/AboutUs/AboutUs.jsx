import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Container from '../../Components/Container';

const AboutUs = () => {
  return (
    <div className="py-10">
      <Container className="bg-white lg:rounded-4xl py-8 md:py-20 px-2 md:px-10 lg:px-24">
        {/* Header */}
        <div>
          <h2 className="text-secondary text-3xl md:text-[56px] font-extrabold">About Us</h2>

          <div className="text-info hidden md:block">
            <p>
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
              personal
            </p>
            <p>packages to business shipments we deliver on time, every time.</p>
          </div>

          <div className="text-info md:hidden text-sm mt-3">
            <p>
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
              personal packages to business shipments we deliver on time, every time.
            </p>
          </div>
        </div>

        <div className="border border-dashed border-gray-300 my-6.5 md:my-12.5" />

        {/* Tabs */}
        <Tabs>
          <TabList className="flex justify-between md:justify-start md:gap-3.5 mb-4">
            {['Story', 'Mission', 'Success', 'Team & Others'].map((item) => (
              <Tab
                key={item}
                className="text-base md:text-2xl"
                selectedClassName="border-b border-gray-300 text-[#5B6A2E] font-bold"
              >
                {item}
              </Tab>
            ))}
          </TabList>

          {/* Story */}
          <TabPanel className="space-y-6 [&_p]:text-justify [&_p]:md:leading-8">
            <p>
              We started with a simple promise to make parcel delivery fast, reliable, and
              stress-free. Over the years, our commitment to real-time tracking, efficient
              logistics, and customer-first service has made us a trusted partner for thousands.
            </p>

            <p>
              Whether it's a personal gift or a time-sensitive business delivery, we ensure it
              reaches its destination on time, every time.
            </p>

            <p>
              Our focus on reliability and care has helped us build long-term relationships with
              customers who depend on us every day.
            </p>
          </TabPanel>

          {/* Mission */}
          <TabPanel className="space-y-6 [&_p]:text-justify [&_p]:md:leading-8">
            <p>
              Our mission is to transform the entire parcel delivery experience into one that is
              seamless, reliable, and built on trust, speed, and customer satisfaction.
            </p>

            <p>
              We use advanced tracking systems and responsive customer support to ensure complete
              transparency and peace of mind throughout the delivery process.
            </p>

            <p>
              Every decision we make is driven by integrity, accountability, and a commitment to
              exceeding expectations for both individuals and businesses.
            </p>
          </TabPanel>

          {/* Success */}
          <TabPanel className="space-y-6 [&_p]:text-justify [&_p]:md:leading-8">
            <p className="font-semibold">A Success Story: Delivering Trust, One Parcel at a Time</p>

            <p>
              A small business owner from Chittagong needed urgent multi-district deliveries within
              24 hours. Our team optimized routes and ensured every parcel arrived safely and on
              time.
            </p>

            <p>
              Real-time tracking and proactive support helped her meet all commitments without
              stress, strengthening trust with her clients.
            </p>

            <p>
              Stories like this define our success and motivate us to deliver excellence every day.
            </p>
          </TabPanel>

          {/* Team */}
          <TabPanel className="space-y-6 [&_p]:text-justify [&_p]:md:leading-8">
            <p>
              Our team is the backbone of our success. From logistics planners to customer support
              specialists, everyone works together to ensure reliable, on-time delivery.
            </p>

            <p>
              Supported by trusted partners and drivers, we maintain high standards of efficiency,
              care, and customer satisfaction across every shipment.
            </p>
          </TabPanel>
        </Tabs>
      </Container>
    </div>
  );
};

export default AboutUs;
