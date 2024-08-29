import React,{useState} from 'react'
import { FiSearch } from 'react-icons/fi';


const footballPlayers = [
    { name: 'Lionel Messi', image: 'https://th.bing.com/th/id/R.f12ee4859f816d537061342520e08a24?rik=adSagd4XzSqwMg&pid=ImgRaw&r=0' },
    { name: 'Cristiano Ronaldo', image: 'https://th.bing.com/th/id/R.5edeeaa3311d9c9836407b4029b03e57?rik=SRphs%2fOuyo36Bg&riu=http%3a%2f%2fstatic.independent.co.uk%2fs3fs-public%2fthumbnails%2fimage%2f2016%2f06%2f03%2f08%2fcristiano-ronaldo.jpg&ehk=RNMy1ITZgAcFhy9kQyrUFzQ0PcYCX2QiJQGr7teEI%2fA%3d&risl=&pid=ImgRaw&r=0' },
    { name: 'Neymar Jr.', image: 'https://th.bing.com/th/id/R.e60f03819a1d7283e57d4b384a0198c9?rik=IyyJefQo9Ca%2b1g&riu=http%3a%2f%2fwallsdesk.com%2fwp-content%2fuploads%2f2016%2f07%2fNeymar-High-Quality-Wallpapers.jpg&ehk=auB2MNCXEN%2bCBi4CLdx3zE9rL5vGSvIlE9dupCpfTE0%3d&risl=&pid=ImgRaw&r=0' },
    { name: 'Kylian Mbappé', image: 'https://th.bing.com/th/id/R.0e6887cf60ebfa0657fa104d162e1ceb?rik=YA%2bxt7tyOsFTqw&pid=ImgRaw&r=0' },
    { name: 'Mohamed Salah', image: 'https://th.bing.com/th/id/R.8b9cc790004504b6678de842f7293eaf?rik=kWmKneDwzi4CUQ&pid=ImgRaw&r=0' },
    { name: 'Kevin De Bruyne', image: 'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blteab1ee5ddd25d672/63413567500bde112e2a0c41/Kevin_De_Bruyne.jpg' },
  ];
  
const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = footballPlayers.filter(player =>
    player.name.includes(searchQuery)
  );
    
  return (
    <>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Search Football Players</h1>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 pb-5 flex items-center">
            <FiSearch className="text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Search for a player..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 mb-6 text-gray-700 bg-white rounded-lg shadow focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player, index) => (
            
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg flex items-center space-x-4 card-hover">

                <img 
                  src={player.image} 
                  alt={player.name} 
                  className="w-16 h-16 rounded-full object-cover image-frame" 
                />
                <h2 className="text-lg font-semibold text-gray-900">{player.name}</h2>
              </div>
            ))
          ) : (
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900">No players found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home