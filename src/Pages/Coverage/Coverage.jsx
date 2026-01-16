import 'leaflet/dist/leaflet.css';
import { IoIosSearch } from 'react-icons/io';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLoaderData } from 'react-router';
import Container from '../../Components/Container';

const Coverage = () => {
  const position = [23.685, 90.3563];

  const serviceCenters = useLoaderData();
  console.log(serviceCenters);

  return (
    <div className="pt-4 md:pt-8 pb-16 md:pb-31">
      <Container className="bg-white py-5 lg:py-20 lg:px-13.75 xl:px-27.5 lg:rounded-4xl">
        <div>
          <h2 className="text-center lg:text-left text-secondary font-extrabold text-[28px] md:text-[56px]">
            We are available in 64 districts
          </h2>
          <div className="flex justify-center lg:justify-start">
            <form className="my-6.5 md:my-12.5 px-2 md:px-0 w-142.5">
              <div className="max-w-142.5 border-transparent relative rounded-full">
                <IoIosSearch className="md:text-xl absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search here"
                  required
                  className="focus:outline-none focus:border-none bg-[#CBD5E1]/30 w-full py-1 md:py-2 pl-10 pr-20 rounded-full"
                  name="location"
                />
                <button
                  type="button"
                  className="lg:btn bg-primary md:text-xl font-semibold border-0 shadow-none absolute right-0 rounded-full py-1 md:py-1.5 px-5 md:px-5"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border border-dashed border-black/10"></div>

        <h3 className="text-lg md:text-3xl text-center lg:text-left font-bold text-secondary my-12.5 px-3 md-px-0">
          We deliver almost all over Bangladesh
        </h3>

        {/* Map Container */}
        <div className="z-0 h-50 md:h-80 xl:h-150 w-full px-2 lg:px-0 rounded">
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, index) => (
              <Marker position={[center.latitude, center.longitude]} key={index}>
                <Popup>
                  <strong>{center.district}</strong>
                  <br />
                  Service Area: {center.covered_area.join(', ')}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </Container>
    </div>
  );
};

export default Coverage;
