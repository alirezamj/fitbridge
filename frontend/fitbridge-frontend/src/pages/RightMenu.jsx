import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const RightMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative h-screen">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-[-40px] top-4 bg-gray-200 p-2 rounded-l shadow hover:bg-gray-300 z-10"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Menu */}
      <aside
        className={`w-32 bg-gray-100 border-l border-gray-300 p-2 h-full transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? 'w-32 relative'
            : 'w-0 absolute right-0 top-0'
        }`}
      >
        {isOpen && (
          <div className="opacity-100 transition-opacity duration-300">
            <h2 className="text-lg font-semibold mb-4">Coach Menu</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/clients')}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-200"
                >
                  Clients
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/trainings')}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-200"
                >
                  Trainings
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/nutrition')}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-200"
                >
                  Nutrition Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/messages')}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-200"
                >
                  Messages
                </button>
              </li>
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
};

export default RightMenu;