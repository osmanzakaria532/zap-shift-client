import 'leaflet/dist/leaflet.css';
import { IoIosSearch } from 'react-icons/io';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// MUST: Fix default icon issue in React
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useRef } from 'react';
import { useLoaderData } from 'react-router';
import Container from '../../components/Container';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const position = [23.685, 90.3563];

const Coverage = () => {
  // Ref for the map instance
  const mapRef = useRef(null);

  // Load service centers data
  const serviceCenters = useLoaderData();

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;

    // Implement search functionality here
    // Find the district in serviceCenters
    const district = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district) {
      // Get the map instance from the ref
      const foundDistrict = [district.latitude, district.longitude];

      // Fly to the found district on the map
      mapRef.current.flyTo(foundDistrict, 14);
    }
  };

  return (
    <div className="py-10">
      <Container className="bg-white py-20 px-24 rounded-lg shadow-lg">
        <div>
          <h2 className="text-secondary font-extrabold text-[56px]">
            We are available in 64 districts
          </h2>

          <form onSubmit={handleSearch} className="my-[50px]">
            <div className="max-w-[570px] border-transparent relative rounded-full">
              <IoIosSearch className="text-xl absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search here"
                required
                className="focus:outline-none focus:border-none bg-[#CBD5E1]/30 w-full py-2 pl-10 pr-20 rounded-full"
                name="location"
              />
              <button
                type="button"
                className="btn bg-primary text-xl font-semibold border-0 shadow-none absolute right-0 rounded-full"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="border border-dashed"></div>

        <h3 className="text-3xl font-bold text-secondary  my-[50px]">
          We deliver almost all over Bangladesh
        </h3>

        <div className="z-0" style={{ height: '600px', width: '100%' }}>
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }} // MUST
            ref={mapRef} // Attach ref to the MapContainer
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
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
