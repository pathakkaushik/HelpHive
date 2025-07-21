export const services = [
  { name: 'Maid', icon: '🧹', description: 'For a spotless home.' },
  { name: 'Cook', icon: '🍳', description: 'For delicious, healthy meals.' },
  { name: 'Babysitter', icon: '👶', description: 'For caring for your little ones.' },
  { name: 'Elderly Care', icon: '👵', description: 'For assisting your seniors.' },
  { name: 'Driver', icon: '🚗', description: 'For safe and reliable commutes.' },
  { name: 'Gardener', icon: '🌿', description: 'For maintaining green spaces.' },
];

export const reviewsData = [
    { name: 'Anjali Mehta', quote: "Sita was amazing! Our house has never been cleaner. She is punctual, professional, and very thorough. Highly recommended!", rating: 5 },
    { name: 'Rahul Verma', quote: "Finding a trustworthy person for elderly care was tough, but HelpHive connected us with Anil. He is patient, caring, and a true professional.", rating: 5 },
    { name: 'Pooja Desai', quote: "Good service, but arrived 15 minutes late on the first day. The work quality was excellent though.", rating: 4 },
];

const originalHelpers = [
  { 
    id: 1, 
    name: 'Sita Devi', 
    role: 'Maid', 
    rating: 4.8, 
    reviews: 120, 
    experience: 5, 
    location: 'Kandivali, Mumbai', 
    city: 'Mumbai',
    verified: { police: true, id: true }, 
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 
    tagline: 'Bringing sparkle to your home, one room at a time.',
    description: 'Dedicated and hardworking maid with 5 years of experience in residential cleaning. I take pride in making homes shine and ensuring a hygienic environment for your family.', 
    skills: ['Deep Cleaning', 'Laundry', 'Ironing', 'Organization'],
    profileVideoThumbnail: 'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 2, 
    name: 'Ramesh Kumar', 
    role: 'Cook', 
    rating: 4.9, 
    reviews: 95, 
    experience: 8, 
    location: 'Lajpat Nagar, Delhi', 
    city: 'Delhi',
    verified: { police: true, id: true }, 
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 
    tagline: 'Gourmet meals, cooked with love in your own kitchen.',
    description: 'Professional cook specializing in North Indian and Continental cuisines. Passionate about creating healthy and flavorful meals for families.', 
    skills: ['Meal Planning', 'Vegetarian & Non-Vegetarian', 'Baking', 'Kitchen Management'],
    profileVideoThumbnail: 'https://images.pexels.com/photos/6994191/pexels-photo-6994191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 3, 
    name: 'Priya Sharma', 
    role: 'Babysitter', 
    rating: 5.0, 
    reviews: 150, 
    experience: 4, 
    location: 'Koramangala, Bengaluru', 
    city: 'Bengaluru',
    verified: { police: false, id: true }, 
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 
    tagline: "Your child's safety and happiness is my priority.",
    description: 'Caring and energetic babysitter with a certification in child first-aid. I love engaging children in creative and educational activities.', 
    skills: ['First Aid Certified', 'Newborn Care', 'Homework Help', 'Creative Play'],
    profileVideoThumbnail: 'https://images.pexels.com/photos/4545143/pexels-photo-4545143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 4, 
    name: 'Anil Singh', 
    role: 'Elderly Care', 
    rating: 4.7, 
    reviews: 80, 
    experience: 7, 
    location: 'Salt Lake, Kolkata', 
    city: 'Kolkata',
    verified: { police: true, id: true }, 
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 
    tagline: 'Compassionate care and companionship for your loved ones.',
    description: 'Compassionate caregiver with experience in assisting elderly clients with daily activities, medication management, and companionship.', 
    skills: ['Medication Reminders', 'Mobility Assistance', 'Companionship', 'Meal Preparation'],
    profileVideoThumbnail: 'https://images.pexels.com/photos/4058316/pexels-photo-4058316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 5, 
    name: 'Meena Kumari', 
    role: 'Maid', 
    rating: 4.6, 
    reviews: 75, 
    experience: 3, 
    location: 'T. Nagar, Chennai', 
    city: 'Chennai',
    verified: { police: false, id: true }, 
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 
    tagline: 'Efficient and reliable cleaning services.',
    description: 'Reliable and efficient maid service for daily household chores. I am quick, organized, and follow instructions carefully.', 
    skills: ['General Cleaning', 'Dusting', 'Mopping', 'Dishwashing'],
    profileVideoThumbnail: 'https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  { 
    id: 6, 
    name: 'Vikram Batra', 
    role: 'Driver', 
    rating: 4.9, 
    reviews: 110, 
    experience: 10, 
    location: 'Koregaon Park, Pune', 
    city: 'Pune',
    verified: { police: true, id: true }, 
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', 
    tagline: 'Safe, punctual, and professional driving.',
    description: 'Professional driver with a clean record and 10+ years of experience driving in city and highway conditions. Safety is my top priority.', 
    skills: ['Defensive Driving', 'City Navigation', 'Vehicle Maintenance', 'Punctuality'],
    profileVideoThumbnail: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 7,
    name: 'Aisha Khan',
    role: 'Cook',
    rating: 4.8,
    reviews: 88,
    experience: 6,
    location: 'Banjara Hills, Hyderabad',
    city: 'Hyderabad',
    verified: { police: true, id: true },
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    tagline: 'Authentic Hyderabadi cuisine, right in your home.',
    description: 'Expert in South Indian, especially Hyderabadi cuisine. I am passionate about using fresh ingredients to create authentic and mouth-watering dishes.',
    skills: ['Biryani Specialist', 'Spice Blending', 'Menu Curation', 'Hyderabadi Cuisine'],
    profileVideoThumbnail: 'https://images.pexels.com/photos/6994191/pexels-photo-6994191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 8,
    name: 'Sunita Gowda',
    role: 'Babysitter',
    rating: 4.9,
    reviews: 130,
    experience: 5,
    location: 'Indiranagar, Bengaluru',
    city: 'Bengaluru',
    verified: { police: true, id: true },
    imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    tagline: 'Nurturing care for your precious ones.',
    description: 'A loving and responsible babysitter with a knack for connecting with children of all ages. Experienced with toddlers and pre-schoolers.',
    skills: ['Toddler Care', 'Early Childhood Education', 'Storytelling', 'Patient & Calm'],
    profileVideoThumbnail: 'https://images.pexels.com/photos/4545143/pexels-photo-4545143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 9,
    name: 'Rajesh Sharma',
    role: 'Gardener',
    rating: 4.7,
    reviews: 65,
    experience: 12,
    location: 'Vashi, Mumbai',
    city: 'Mumbai',
    verified: { police: false, id: true },
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    tagline: "Your garden's best friend.",
    description: 'Experienced gardener specializing in urban gardening, lawn maintenance, and organic vegetable patches. Let me turn your space into a green oasis.',
    skills: ['Lawn Care', 'Pruning', 'Organic Pest Control', 'Landscaping'],
    profileVideoThumbnail: 'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
];

const generatedHelpers = [];
const locations = {
    Mumbai: ["Bandra", "Andheri", "Powai", "Kandivali", "Juhu", "Malabar Hill"],
    Delhi: ["Saket", "Hauz Khas", "Karol Bagh", "Lajpat Nagar", "Gurgaon", "Noida"],
    Bengaluru: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Jayanagar"],
    Kolkata: ["Alipore", "Salt Lake", "Ballygunge", "New Town", "Park Street"],
    Chennai: ["Adyar", "T. Nagar", "Anna Nagar", "Velachery", "Mylapore"],
    Hyderabad: ["Banjara Hills", "Jubilee Hills", "Gachibowli", "Hi-tech City"],
    Pune: ["Koregaon Park", "Viman Nagar", "Kalyani Nagar", "Baner", "Deccan"],
    Ahmedabad: ["Satellite", "Vastrapur", "Bodakdev", "Navrangpura"]
};
const firstNamesMale = ["Aarav", "Arjun", "Rohan", "Vikram", "Aditya", "Rahul", "Karan", "Suresh", "Manish", "Amit", "Raj", "Sanjay", "Ankit", "Vivek", "Harish"];
const firstNamesFemale = ["Isha", "Kavya", "Ananya", "Fatima", "Aditi", "Saanvi", "Diya", "Pooja", "Neha", "Sunita", "Riya", "Priya", "Meera", "Geeta", "Leela"];
const lastNames = ["Patel", "Reddy", "Singh", "Mehta", "Verma", "Joshi", "Ansari", "Rao", "Desai", "Gupta", "Chauhan", "Kumar", "Sharma", "Nair", "Malhotra"];

const content = {
    Maid: {
        taglines: ["A clean home is a happy home.", "Bringing sparkle to every corner.", "Your home, perfectly clean.", "Reliable and efficient cleaning service."],
        descriptions: ["I am a meticulous and trustworthy maid, skilled in all aspects of household cleaning. I am adaptable to your specific needs.", "Experienced in deep cleaning and organization for residential properties. I ensure a hygienic and pleasant environment for your family.", "Hardworking and detail-oriented, I take pride in my work and aim to exceed your expectations for a clean home."],
        skills: ["Deep Cleaning", "Laundry & Ironing", "Organization", "Appliance Cleaning", "Wardrobe Management", "Pet-friendly Cleaning"],
        thumbnails: ["https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]
    },
    Cook: {
        taglines: ["Restaurant-quality food from your kitchen.", "Delicious, healthy meals, every day.", "The taste of authentic home cooking.", "Your personal chef for every occasion."],
        descriptions: ["A creative chef with a flair for various cuisines. I love creating customized meal plans for health-conscious families.", "Specializing in traditional Indian cuisine, I bring generations of family recipes to your table. I am an expert in using fresh, local ingredients.", "Professional cook with experience in meal planning, preparation, and kitchen management. I can cater to dietary restrictions and preferences."],
        skills: ["Meal Planning", "North Indian Cuisine", "South Indian Cuisine", "Baking", "Kitchen Management", "Italian Cuisine", "Pan-Asian Cooking"],
        thumbnails: ["https://images.pexels.com/photos/6994191/pexels-photo-6994191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]
    },
    Babysitter: {
        taglines: ["Fun, learning, and care for your little one.", "Your child's safety is my priority.", "Nurturing care for your precious ones.", "A joyful and safe space for children."],
        descriptions: ["With a background in early childhood development, I create a stimulating and safe environment. I enjoy arts, crafts, and educational games.", "I am a patient and creative babysitter with experience handling multiple children. I focus on positive reinforcement and engaging activities.", "Caring and energetic, with certification in child first-aid. I love engaging children in both indoor and outdoor activities to help them grow."],
        skills: ["First Aid Certified", "Toddler Care", "Homework Help", "Creative Play", "Newborn Care", "Positive Discipline", "Meal Prep for Kids"],
        thumbnails: ["https://images.pexels.com/photos/4545143/pexels-photo-4545143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]
    },
    "Elderly Care": {
        taglines: ["Compassionate care for your loved ones.", "Dignified and respectful senior care.", "Your trusted companion for senior family members.", "Attentive and professional elderly support."],
        descriptions: ["I specialize in providing holistic care for seniors, focusing on their physical health, mental well-being, and companionship. I am trained in basic first-aid.", "I provide compassionate support, helping with mobility, personal care, and ensuring engaging companionship. I am trained in geriatric care principles.", "Experienced caregiver assisting with daily activities, medication management, and providing a friendly, supportive presence for seniors."],
        skills: ["Medication Management", "Mobility Assistance", "Companionship", "Dementia Care", "Geriatric Care", "Physiotherapy Assistance", "Emotional Support"],
        thumbnails: ["https://images.pexels.com/photos/4058316/pexels-photo-4058316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]
    },
    Driver: {
        taglines: ["Safe, punctual, and professional driving.", "Your reliable partner on the road.", "Your personal chauffeur for the city.", "Comfortable and secure travel, guaranteed."],
        descriptions: ["Highly experienced driver with an impeccable safety record. I am proficient in driving both manual and automatic luxury vehicles. Available for city and outstation trips.", "With over a decade of professional driving experience, I prioritize safety and punctuality. I have extensive knowledge of city routes and traffic patterns.", "Professional driver with a clean record and excellent navigation skills. My priority is to provide a smooth and stress-free journey."],
        skills: ["Defensive Driving", "City Navigation", "Vehicle Maintenance", "Punctuality", "Luxury Car Handling", "Route Optimization", "Outstation Trips"],
        thumbnails: ["https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]
    },
    Gardener: {
        taglines: ["Your garden's best friend.", "Cultivating beauty in your outdoor spaces.", "Bringing your green dreams to life.", "Expert care for your plants and lawn."],
        descriptions: ["Experienced gardener specializing in urban gardening, lawn maintenance, and organic vegetable patches. Let me turn your space into a green oasis.", "I help design and maintain beautiful gardens, balconies, and terraces. My expertise includes plant selection, soil management, and sustainable practices.", "Passionate about plants and landscaping, I provide comprehensive gardening services, from basic maintenance to complete garden makeovers."],
        skills: ["Lawn Care", "Pruning", "Organic Pest Control", "Landscaping", "Bonsai", "Irrigation", "Urban Gardening"],
        thumbnails: ["https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]
    },
};
const maleImageUrls = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1530268729831-4b0b9e170218?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
];
const femaleImageUrls = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1614283232384-525493bc3a69?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1604004555489-723a93d6ce74?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80","https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
];
function getRandomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function generateSkills(role) {
    const allSkills = content[role].skills;
    const shuffled = [...allSkills].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 3);
}

for (let i = 10; i <= 110; i++) {
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const role = getRandomItem(services).name;
    const city = getRandomItem(Object.keys(locations));
    const neighborhood = getRandomItem(locations[city]);

    const helper = {
        id: i,
        name: `${getRandomItem(gender === 'male' ? firstNamesMale : firstNamesFemale)} ${getRandomItem(lastNames)}`,
        role: role,
        rating: (Math.random() * (4.9 - 4.3) + 4.3).toFixed(1),
        reviews: Math.floor(Math.random() * 180) + 20,
        experience: Math.floor(Math.random() * 14) + 1,
        location: `${neighborhood}, ${city}`,
        city: city,
        verified: { police: Math.random() > 0.2, id: Math.random() > 0.1 },
        imageUrl: getRandomItem(gender === 'male' ? maleImageUrls : femaleImageUrls),
        tagline: getRandomItem(content[role].taglines),
        description: getRandomItem(content[role].descriptions),
        skills: generateSkills(role),
        profileVideoThumbnail: getRandomItem(content[role].thumbnails),
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    };
    generatedHelpers.push(helper);
}

export const helpers = [...originalHelpers, ...generatedHelpers];
