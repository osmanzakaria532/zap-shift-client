import { Camera, Eye, EyeOff, Lock, MapPin, User } from 'lucide-react';
import { useState } from 'react';

const Edits = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600 mb-2">
            প্রোফাইল সম্পাদনা
          </h1>
          <p className="text-gray-600">আপনার তথ্য আপডেট করুন</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
          <div className="bg-linear-to-r from-emerald-500 to-teal-500 h-32"></div>

          <div className="px-6 md:px-10 pb-10">
            {/* Profile Image */}
            <div className="flex justify-center -mt-20 mb-8">
              <div className="relative">
                <img
                  src="https://i.ibb.co/7QpKsCX/avatar.png"
                  className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
                  alt="profile"
                />
                <div className="absolute bottom-2 right-2 bg-emerald-500 rounded-full p-2 shadow-lg">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <User className="w-5 h-5 mr-2 text-emerald-600" />
                  নাম
                </label>
                <input
                  type="text"
                  placeholder="আপনার নাম লিখুন"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg
                  focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* District */}
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                  জেলা
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg
                  focus:outline-none focus:border-emerald-500"
                >
                  <option>Dhaka</option>
                  <option>Chattogram</option>
                  <option>Sylhet</option>
                  <option>Khulna</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <Lock className="w-5 h-5 mr-2 text-emerald-600" />
                  নতুন পাসওয়ার্ড
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="নতুন পাসওয়ার্ড"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-lg
                    focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              className="w-full mt-8 py-4 rounded-xl text-white font-bold text-lg
              bg-linear-to-br from-emerald-500 to-emerald-600
              hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30"
            >
              সংরক্ষণ করুন
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">এটি শুধুমাত্র ডিজাইন ভিউ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edits;
