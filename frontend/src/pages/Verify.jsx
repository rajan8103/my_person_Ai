import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext"; // Correct import

const Verify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Get verifyUser function and btnLoading from context
  const { verifyUser, btnLoading } = UserData();

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate);
    setOtp(""); // Clear input field after submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center p-4 relative overflow-hidden">
      {/* Animated background lightning effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="lightning-bolt lightning-bolt-1"></div>
        <div className="lightning-bolt lightning-bolt-2"></div>
        <div className="lightning-bolt lightning-bolt-3"></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 hover:border-blue-400/50 transition-all duration-300 group"
      >
        {/* Electric border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            ⚡ Verify ⚡
          </h2>

          <div className="mb-8">
            <label
              className="block text-gray-200 mb-3 font-medium"
              htmlFor="otp"
            >
              Enter OTP
            </label>
            <div className="relative">
              <input
                type="number"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 hover:bg-white/10"
                placeholder="Enter your OTP"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>

          <button
            type="submit"
            disabled={btnLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {btnLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>⚡ Verify ⚡</>
              )}
            </span>

            {/* Lightning effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verify;
