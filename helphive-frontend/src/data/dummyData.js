// src/data/dummyData.js
export const services = [
  { name: 'Maid', icon: '🧹', description: 'For a spotless home.' },
  { name: 'Cook', icon: '🍳', description: 'For delicious, healthy meals.' },
  { name: 'Babysitter', icon: '👶', description: 'For caring for your little ones.' },
  { name: 'Elderly Care', icon: '👵', description: 'For assisting your seniors.' },
  { name: 'Driver', icon: '🚗', description: 'For safe and reliable commutes.' },
  { name: 'Gardener', icon: '🌿', description: 'For maintaining green spaces.' },
];

export const helpers = [
  { id: 1, name: 'Sita Devi', role: 'Maid', rating: 4.8, reviews: 120, experience: 5, location: 'Mumbai, MH', verified: { police: true, id: true }, imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', description: 'Dedicated and hardworking maid with 5 years of experience in residential cleaning. I take pride in making homes shine.', skills: ['Deep Cleaning', 'Laundry', 'Ironing', 'Organization'] },
  { id: 2, name: 'Ramesh Kumar', role: 'Cook', rating: 4.9, reviews: 95, experience: 8, location: 'Delhi, DL', verified: { police: true, id: true }, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', description: 'Professional cook specializing in North Indian and Continental cuisines. Passionate about creating healthy and flavorful meals for families.', skills: ['Meal Planning', 'Vegetarian & Non-Vegetarian', 'Baking', 'Kitchen Management'] },
  { id: 3, name: 'Priya Sharma', role: 'Babysitter', rating: 5.0, reviews: 150, experience: 4, location: 'Bengaluru, KA', verified: { police: false, id: true }, imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', description: 'Caring and energetic babysitter with a certification in child first-aid. I love engaging children in creative and educational activities.', skills: ['First Aid Certified', 'Newborn Care', 'Homework Help', 'Creative Play'] },
  { id: 4, name: 'Anil Singh', role: 'Elderly Care', rating: 4.7, reviews: 80, experience: 7, location: 'Kolkata, WB', verified: { police: true, id: true }, imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', description: 'Compassionate caregiver with experience in assisting elderly clients with daily activities, medication management, and companionship.', skills: ['Medication Reminders', 'Mobility Assistance', 'Companionship', 'Meal Preparation'] },
  { id: 5, name: 'Meena Kumari', role: 'Maid', rating: 4.6, reviews: 75, experience: 3, location: 'Chennai, TN', verified: { police: false, id: true }, imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', description: 'Reliable and efficient maid service for daily household chores. I am quick, organized, and follow instructions carefully.', skills: ['General Cleaning', 'Dusting', 'Mopping', 'Dishwashing'] },
  { id: 6, name: 'Vikram Batra', role: 'Driver', rating: 4.9, reviews: 110, experience: 10, location: 'Pune, MH', verified: { police: true, id: true }, imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', description: 'Professional driver with a clean record and 10+ years of experience driving in city and highway conditions. Safety is my top priority.', skills: ['Defensive Driving', 'City Navigation', 'Vehicle Maintenance', 'Punctuality'] },
];

export const reviewsData = [
    { name: 'Anjali Mehta', quote: "Sita was amazing! Our house has never been cleaner. She is punctual, professional, and very thorough. Highly recommended!", rating: 5 },
    { name: 'Rahul Verma', quote: "Finding a trustworthy person for elderly care was tough, but HelpHive connected us with Anil. He is patient, caring, and a true professional.", rating: 5 },
    { name: 'Pooja Desai', quote: "Good service, but arrived 15 minutes late on the first day. The work quality was excellent though.", rating: 4 },
];