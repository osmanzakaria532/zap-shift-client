import { useQuery } from '@tanstack/react-query';
import { Link, Outlet, useMatch } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Stat = ({ title, label, color, icon }) => (
  <div className={`bg-${color}-50 p-4 rounded-xl border-l-4 border-${color}-500`}>
    <div className="flex justify-between items-center">
      <div>
        <div className={`text-3xl font-bold text-${color}-600`}>{title}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
      <i className={`fas ${icon} text-3xl text-${color}-500 opacity-50`}></i>
    </div>
  </div>
);

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user: firebaseUser } = useAuth();

  const { data: users = [] } = useQuery({
    queryKey: ['users', firebaseUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${firebaseUser?.email}`);
      return res.data;
    },
  });
  console.log(users);

  const isEditPage = useMatch('/dashboard/profile/edit');
  return (
    <>
      {isEditPage ? (
        <Outlet />
      ) : (
        users.map((user, i) => (
          <div key={i} className="bg-linear-to-br from-orange-50 to-red-50 min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Cover */}
                <div className="h-48 bg-linear-to-r from-orange-500 via-red-500 to-pink-500 relative">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className="fas fa-truck text-white text-6xl opacity-20"></i>
                  </div>
                </div>

                {/* Header */}
                <div className="relative px-6 pb-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 sm:-mt-16">
                    <div className="relative">
                      <img
                        src={user?.photoURl}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                      />
                      <div className="absolute bottom-2 right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                        <i className="fas fa-check text-sm"></i>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h1 className="text-3xl font-bold text-gray-800">{user?.displayName}</h1>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          Active
                        </span>
                      </div>
                      <p className="text-orange-600 font-semibold mt-1 capitalize">{user.role}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        চট্টগ্রাম, বাংলাদেশ
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0">
                      <Link
                        to="/dashboard/profile/edit"
                        className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                      >
                        <i className="fas fa-edit mr-2"></i>
                        প্রোফাইল আপডেট
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="px-6 pb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Stat title="১,২৫০" label="সফল ডেলিভারি" color="green" icon="fa-box-check" />
                  <Stat title="৪.৮" label="গড় রেটিং" color="blue" icon="fa-star" />
                  <Stat title="৯৮%" label="সময়মত ডেলিভারি" color="purple" icon="fa-clock" />
                  <Stat title="৩+" label="বছরের অভিজ্ঞতা" color="orange" icon="fa-award" />
                </div>

                {/* Main Content */}
                <div className="px-6 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* About */}
                    <div className="bg-orange-50 rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-3">সম্পর্কে / About</h2>
                      <p className="text-gray-700 leading-relaxed">
                        আমি একজন অভিজ্ঞ এবং বিশ্বস্ত ডেলিভারি রাইডার। গত ৩ বছর যাবত চট্টগ্রাম
                        এলাকায় পার্সেল ডেলিভারি সার্ভিস দিয়ে আসছি।
                      </p>
                    </div>

                    {/* Service Areas */}
                    <div className="bg-white rounded-xl p-6 border">
                      <h3 className="text-lg font-semibold mb-4">সার্ভিস এরিয়া / Service Areas</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['আগ্রাবাদ', 'নাসিরাবাদ', 'পাঁচলাইশ', 'চকবাজার', 'খুলশী', 'হালিশহর'].map(
                          (area) => (
                            <div key={area} className="bg-orange-50 px-3 py-2 rounded-lg">
                              {area}
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Vehicle */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">যানবাহনের তথ্য / Vehicle</h3>
                      <p>মোটরসাইকেল | Honda CB150R | ঢাকা মেট্রো-গ ১২৩৪৫</p>
                    </div>

                    {/* Reviews */}
                    <div className="bg-white rounded-xl p-6 border">
                      <h3 className="text-lg font-semibold mb-4">সাম্প্রতিক রিভিউ / Reviews</h3>
                      <p className="text-sm text-gray-600">অসাধারণ সার্ভিস! সময়মত ডেলিভারি।</p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="space-y-6">
                    {/* Contact */}
                    <div className="bg-blue-50 rounded-xl p-6 sticky top-6">
                      <h3 className="text-lg font-semibold mb-4">যোগাযোগ</h3>
                      <p>📞 +880 1XXX-XXXXXX</p>
                      <p>✉️ rahim@delivery.com</p>
                      <button className="w-full mt-4 bg-orange-600 text-white py-3 rounded-lg">
                        এখনই যোগাযোগ করুন
                      </button>
                    </div>

                    {/* Working Hours */}
                    <div className="bg-white rounded-xl p-6 border">
                      <h3 className="text-lg font-semibold mb-4">কর্মঘণ্টা</h3>
                      <p>রবি–বৃহঃ ৯টা–৯টা</p>
                      <p>শুক্রবার ২টা–৯টা</p>
                    </div>

                    {/* Achievements */}
                    <div className="bg-yellow-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">অর্জন</h3>
                      <p>🏆 সেরা ডেলিভারি রাইডার ২০২৫</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8 text-gray-600">
                নিরাপদ এবং বিশ্বস্ত ডেলিভারি সার্ভিস © ২০২৬
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Profile;
