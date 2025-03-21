export interface Investment {
    id: number;
    title: string;
    amount: number;
    usdEquivalent: number;
    requester: string;
    department: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    date: string;
    desc: string;
    docs: string[];
    risk: 'Low' | 'Medium' | 'High';
    roi: string;
    urgency: 'Medium' | 'High' | 'Critical';
    teamSize: number;
    walletAddress: string;
    securityScore: number;
    volatilityIndex: number;
    imageUrl: string;
    company: string;
    client: string;
    requirements: string;
  }
  
  export const initialInvestments: Investment[] = [
    {
      id: 1,
      title: 'Tech Infrastructure Expansion',
      amount: 50,
      usdEquivalent: 3500000,
      requester: 'Dr. Emma Watson',
      department: 'R&D',
      status: 'Pending',
      date: '2025-03-20',
      desc: 'Expand tech infrastructure with advanced hardware.',
      docs: ['Infra_Proposal.pdf', 'Budget.pdf'],
      risk: 'High',
      roi: '35%',
      urgency: 'Critical',
      teamSize: 25,
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      securityScore: 85,
      volatilityIndex: 60,
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      company: 'Nexlify',
      client: 'Google',
      requirements: 'Scalable servers, high-performance computing.',
    },
    {
      id: 2,
      title: 'Trading Platform Web',
      amount: 30,
      usdEquivalent: 2100000,
      requester: 'John Doe',
      department: 'Web Development',
      status: 'Pending',
      date: '2025-03-19',
      desc: 'Develop a high-frequency trading platform.',
      docs: ['Trading_Plan.pdf'],
      risk: 'Medium',
      roi: '25%',
      urgency: 'High',
      teamSize: 15,
      walletAddress: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      securityScore: 90,
      volatilityIndex: 45,
      imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      company: 'WebPulse',
      client: 'Amazon',
      requirements: 'Real-time data, user dashboard.',
    },
    {
      id: 3,
      title: 'Mobile Security App',
      amount: 10,
      usdEquivalent: 700000,
      requester: 'Sarah Lee',
      department: 'App Development',
      status: 'Approved',
      date: '2025-03-18',
      desc: 'Enhance mobile security with advanced encryption.',
      docs: ['Security_Proposal.pdf'],
      risk: 'Low',
      roi: '15%',
      urgency: 'Medium',
      teamSize: 8,
      walletAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      securityScore: 95,
      volatilityIndex: 30,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'AppSecure',
      client: 'Apple',
      requirements: 'End-to-end encryption, biometric auth.',
    },
    {
      id: 4,
      title: 'Payment Gateway Web',
      amount: 20,
      usdEquivalent: 1400000,
      requester: 'Michael Chen',
      department: 'Web Development',
      status: 'Pending',
      date: '2025-03-21',
      desc: 'Build a web-based payment gateway.',
      docs: ['Gateway_Specs.pdf', 'Timeline.pdf'],
      risk: 'Medium',
      roi: '20%',
      urgency: 'High',
      teamSize: 12,
      walletAddress: '1BoatSLRHtKNngkdXEeobR76b53LETtpyT',
      securityScore: 88,
      volatilityIndex: 50,
      imageUrl: 'https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg',
      company: 'PayFlow',
      client: 'PayPal',
      requirements: 'Fast transactions, multi-currency support.',
    },
    {
      id: 5,
      title: 'Employee Training Web',
      amount: 5,
      usdEquivalent: 350000,
      requester: 'Lisa Patel',
      department: 'Web Development',
      status: 'Rejected',
      date: '2025-03-17',
      desc: 'Create a web platform for employee training.',
      docs: ['Edu_Proposal.pdf'],
      risk: 'Low',
      roi: '10%',
      urgency: 'Medium',
      teamSize: 6,
      walletAddress: '3EktnHQD7RiAE6uzMj2ZifT9YgRrkSgzQX',
      securityScore: 92,
      volatilityIndex: 25,
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      company: 'LearnPeak',
      client: 'Microsoft',
      requirements: 'Interactive modules, progress tracking.',
    },
    {
      id: 6,
      title: 'Storage Management App',
      amount: 40,
      usdEquivalent: 2800000,
      requester: 'Robert Kim',
      department: 'App Development',
      status: 'Pending',
      date: '2025-03-22',
      desc: 'Develop an app for secure storage management.',
      docs: ['Storage_Plan.pdf', 'Security_Audit.pdf'],
      risk: 'High',
      roi: '30%',
      urgency: 'Critical',
      teamSize: 20,
      walletAddress: '1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF',
      securityScore: 87,
      volatilityIndex: 55,
      imageUrl: 'https://images.pexels.com/photos/310435/pexels-photo-310435.jpeg',
      company: 'StoreSafe',
      client: 'Dropbox',
      requirements: 'Cloud integration, access control.',
    },
    {
      id: 7,
      title: 'E-commerce Marketplace Web',
      amount: 15,
      usdEquivalent: 1050000,
      requester: 'Alex Turner',
      department: 'Web Development',
      status: 'Pending',
      date: '2025-03-23',
      desc: 'Develop a web-based e-commerce marketplace.',
      docs: ['Marketplace_Specs.pdf'],
      risk: 'Medium',
      roi: '22%',
      urgency: 'High',
      teamSize: 10,
      walletAddress: '1HckjUpRtYvXrk2H3LtUPcM2nEgq2Ys7GJ',
      securityScore: 89,
      volatilityIndex: 40,
      imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      company: 'ShopSync',
      client: 'eBay',
      requirements: 'Vendor portals, payment integration.',
    },
    {
      id: 8,
      title: 'Mobile Banking App',
      amount: 8,
      usdEquivalent: 560000,
      requester: 'Nina Brooks',
      department: 'App Development',
      status: 'Approved',
      date: '2025-03-16',
      desc: 'Create a mobile banking app.',
      docs: ['App_Design.pdf'],
      risk: 'Low',
      roi: '18%',
      urgency: 'Medium',
      teamSize: 7,
      walletAddress: '3Kzh9qAqVWQhEsfQz7zEQL1EuSx5tyNLNS',
      securityScore: 93,
      volatilityIndex: 35,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'BankMobile',
      client: 'JPMorgan Chase',
      requirements: 'Account management, secure transfers.',
    },
    {
      id: 9,
      title: 'Portfolio Tracker Web',
      amount: 7,
      usdEquivalent: 490000,
      requester: 'James Carter',
      department: 'Web Development',
      status: 'Pending',
      date: '2025-03-25',
      desc: 'Create a web-based portfolio tracker.',
      docs: ['Tracker_Specs.pdf'],
      risk: 'Low',
      roi: '15%',
      urgency: 'Medium',
      teamSize: 5,
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      securityScore: 94,
      volatilityIndex: 30,
      imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
      company: 'PortView',
      client: 'Goldman Sachs',
      requirements: 'Real-time updates, asset overview.',
    },
    {
      id: 10,
      title: 'Lending Platform App',
      amount: 18,
      usdEquivalent: 1260000,
      requester: 'Sophia Nguyen',
      department: 'App Development',
      status: 'Approved',
      date: '2025-03-14',
      desc: 'Develop a mobile app for lending services.',
      docs: ['Lending_App.pdf'],
      risk: 'Medium',
      roi: '23%',
      urgency: 'High',
      teamSize: 11,
      walletAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      securityScore: 90,
      volatilityIndex: 45,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'LendTech',
      client: 'Wells Fargo',
      requirements: 'Loan calculator, repayment tracking.',
    },
    {
      id: 11,
      title: 'Event Ticketing Web',
      amount: 12,
      usdEquivalent: 840000,
      requester: 'Ethan Cole',
      department: 'Web Development',
      status: 'Approved',
      date: '2025-03-07',
      desc: 'Build a web platform for event ticketing.',
      docs: ['Ticketing_Plan.pdf'],
      risk: 'Low',
      roi: '18%',
      urgency: 'Medium',
      teamSize: 9,
      walletAddress: '1BoatSLRHtKNngkdXEeobR76b53LETtpyT',
      securityScore: 92,
      volatilityIndex: 30,
      imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
      company: 'TicketFlow',
      client: 'Ticketmaster',
      requirements: 'Digital tickets, event scheduling.',
    },
    {
      id: 12,
      title: 'Crowdfunding Platform Web',
      amount: 15,
      usdEquivalent: 1050000,
      requester: 'Isabella Cruz',
      department: 'Web Development',
      status: 'Pending',
      date: '2025-04-02',
      desc: 'Develop a web platform for crowdfunding.',
      docs: ['Crowd_Plan.pdf'],
      risk: 'Medium',
      roi: '20%',
      urgency: 'High',
      teamSize: 10,
      walletAddress: '3Kzh9qAqVWQhEsfQz7zEQL1EuSx5tyNLNS',
      securityScore: 88,
      volatilityIndex: 45,
      imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      company: 'FundRise',
      client: 'Kickstarter',
      requirements: 'Campaign pages, payment processing.',
    },
    {
      id: 13,
      title: 'Gaming Platform App',
      amount: 32,
      usdEquivalent: 2240000,
      requester: 'Liam Ortiz',
      department: 'App Development',
      status: 'Pending',
      date: '2025-03-31',
      desc: 'Build a mobile gaming platform.',
      docs: ['Gaming_Specs.pdf'],
      risk: 'High',
      roi: '28%',
      urgency: 'Critical',
      teamSize: 15,
      walletAddress: '1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF',
      securityScore: 86,
      volatilityIndex: 60,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'GamePeak',
      client: 'Sony',
      requirements: 'Multiplayer support, in-app purchases.',
    },
    {
      id: 14,
      title: 'Expense Tracker App',
      amount: 6,
      usdEquivalent: 420000,
      requester: 'Henry Ford',
      department: 'App Development',
      status: 'Rejected',
      date: '2025-03-12',
      desc: 'Develop an app to track expenses.',
      docs: ['Expense_App.pdf'],
      risk: 'Low',
      roi: '12%',
      urgency: 'Medium',
      teamSize: 5,
      walletAddress: '3EktnHQD7RiAE6uzMj2ZifT9YgRrkSgzQX',
      securityScore: 93,
      volatilityIndex: 25,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'SpendWise',
      client: 'Intuit',
      requirements: 'Budget tools, expense categorization.',
    },
    {
      id: 15,
      title: 'Real Estate Platform Web',
      amount: 45,
      usdEquivalent: 3150000,
      requester: 'Gabriel Silva',
      department: 'Web Development',
      status: 'Pending',
      date: '2025-04-05',
      desc: 'Create a web platform for real estate deals.',
      docs: ['Real_Estate_Plan.pdf'],
      risk: 'High',
      roi: '35%',
      urgency: 'Critical',
      teamSize: 20,
      walletAddress: '1HckjUpRtYvXrk2H3LtUPcM2nEgq2Ys7GJ',
      securityScore: 85,
      volatilityIndex: 65,
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      company: 'EstateSync',
      client: 'Zillow',
      requirements: 'Property listings, virtual tours.',
    },
    {
      id: 16,
      title: 'Social Media Web',
      amount: 25,
      usdEquivalent: 1750000,
      requester: 'Mia Lopez',
      department: 'Web Development',
      status: 'Pending',
      date: '2025-03-28',
      desc: 'Build a web-based social media platform.',
      docs: ['Social_Specs.pdf'],
      risk: 'High',
      roi: '30%',
      urgency: 'Critical',
      teamSize: 13,
      walletAddress: '1LQoWist8KkaUXSPKZHNvEyWidDcxqsJmp',
      securityScore: 87,
      volatilityIndex: 55,
      imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      company: 'ConnectSphere',
      client: 'Facebook',
      requirements: 'User profiles, real-time messaging.',
    },
    {
      id: 17,
      title: 'Fitness Tracking App',
      amount: 9,
      usdEquivalent: 630000,
      requester: 'Olivia Grant',
      department: 'App Development',
      status: 'Approved',
      date: '2025-03-11',
      desc: 'Develop a mobile app for fitness tracking.',
      docs: ['Fitness_App.pdf'],
      risk: 'Low',
      roi: '15%',
      urgency: 'Medium',
      teamSize: 7,
      walletAddress: '3Kzh9qAqVWQhEsfQz7zEQL1EuSx5tyNLNS',
      securityScore: 91,
      volatilityIndex: 30,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'FitPulse',
      client: 'Fitbit',
      requirements: 'Activity tracking, health metrics.',
    },
    {
      id: 18,
      title: 'Delivery Service App',
      amount: 14,
      usdEquivalent: 980000,
      requester: 'Noah Bennett',
      department: 'App Development',
      status: 'Pending',
      date: '2025-04-01',
      desc: 'Create a mobile app for delivery services.',
      docs: ['Delivery_App.pdf'],
      risk: 'Medium',
      roi: '20%',
      urgency: 'High',
      teamSize: 10,
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      securityScore: 89,
      volatilityIndex: 45,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'DeliverFast',
      client: 'Uber',
      requirements: 'Real-time tracking, driver interface.',
    },
    {
      id: 19,
      title: 'Customer Support Web',
      amount: 8,
      usdEquivalent: 560000,
      requester: 'Amelia Foster',
      department: 'Web Development',
      status: 'Pending',
      date: '2025-04-04',
      desc: 'Develop a web platform for customer support.',
      docs: ['Support_Plan.pdf'],
      risk: 'Low',
      roi: '15%',
      urgency: 'Medium',
      teamSize: 7,
      walletAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      securityScore: 93,
      volatilityIndex: 25,
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      company: 'HelpDeskPro',
      client: 'Zendesk',
      requirements: 'Ticket system, live chat.',
    },
    {
      id: 20,
      title: 'Travel Booking Web',
      amount: 20,
      usdEquivalent: 1400000,
      requester: 'Zara Ahmed',
      department: 'Web Development',
      status: 'Rejected',
      date: '2025-03-10',
      desc: 'Build a web platform for travel booking.',
      docs: ['Travel_Plan.pdf'],
      risk: 'Medium',
      roi: '22%',
      urgency: 'High',
      teamSize: 12,
      walletAddress: '1BoatSLRHtKNngkdXEeobR76b53LETtpyT',
      securityScore: 88,
      volatilityIndex: 50,
      imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
      company: 'TravelSync',
      client: 'Expedia',
      requirements: 'Flight/hotel search, booking engine.',
    },
    {
      id: 21,
      title: 'Video Streaming App',
      amount: 35,
      usdEquivalent: 2450000,
      requester: 'Lucas Hayes',
      department: 'App Development',
      status: 'Pending',
      date: '2025-03-27',
      desc: 'Develop a mobile app for video streaming.',
      docs: ['Streaming_App.pdf'],
      risk: 'High',
      roi: '32%',
      urgency: 'Critical',
      teamSize: 16,
      walletAddress: '1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF',
      securityScore: 85,
      volatilityIndex: 60,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'StreamPeak',
      client: 'Netflix',
      requirements: 'HD streaming, offline mode.',
    },
    {
      id: 22,
      title: 'Job Portal Web',
      amount: 10,
      usdEquivalent: 700000,
      requester: 'Clara Evans',
      department: 'Web Development',
      status: 'Approved',
      date: '2025-03-13',
      desc: 'Create a web-based job portal.',
      docs: ['Job_Portal.pdf'],
      risk: 'Low',
      roi: '18%',
      urgency: 'Medium',
      teamSize: 8,
      walletAddress: '3EktnHQD7RiAE6uzMj2ZifT9YgRrkSgzQX',
      securityScore: 92,
      volatilityIndex: 35,
      imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      company: 'JobLink',
      client: 'LinkedIn',
      requirements: 'Job listings, resume builder.',
    },
    {
      id: 23,
      title: 'Food Ordering App',
      amount: 12,
      usdEquivalent: 840000,
      requester: 'Mason Reed',
      department: 'App Development',
      status: 'Pending',
      date: '2025-03-29',
      desc: 'Develop a mobile app for food ordering.',
      docs: ['Food_App.pdf'],
      risk: 'Medium',
      roi: '20%',
      urgency: 'High',
      teamSize: 9,
      walletAddress: '1HckjUpRtYvXrk2H3LtUPcM2nEgq2Ys7GJ',
      securityScore: 90,
      volatilityIndex: 40,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'FoodSwift',
      client: 'DoorDash',
      requirements: 'Menu display, order tracking.',
    },
    {
      id: 24,
      title: 'Online Learning Web',
      amount: 18,
      usdEquivalent: 1260000,
      requester: 'Dr. Aisha Khan',
      department: 'Web Development',
      status: 'Pending',
      date: '2025-03-30',
      desc: 'Build a web platform for online learning.',
      docs: ['Learning_Plan.pdf'],
      risk: 'Medium',
      roi: '25%',
      urgency: 'High',
      teamSize: 11,
      walletAddress: '1LQoWist8KkaUXSPKZHNvEyWidDcxqsJmp',
      securityScore: 89,
      volatilityIndex: 50,
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      company: 'EduWeb',
      client: 'Coursera',
      requirements: 'Course catalog, video lectures.',
    },
    {
      id: 25,
      title: 'Ride Sharing App',
      amount: 22,
      usdEquivalent: 1540000,
      requester: 'Dr. Omar Khalid',
      department: 'App Development',
      status: 'Approved',
      date: '2025-03-26',
      desc: 'Develop a mobile app for ride sharing.',
      docs: ['Ride_App.pdf'],
      risk: 'Medium',
      roi: '25%',
      urgency: 'High',
      teamSize: 14,
      walletAddress: '3Kzh9qAqVWQhEsfQz7zEQL1EuSx5tyNLNS',
      securityScore: 88,
      volatilityIndex: 50,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'RideSync',
      client: 'Lyft',
      requirements: 'Driver matching, fare calculator.',
    },
    {
      id: 26,
      title: 'HR Management Web',
      amount: 16,
      usdEquivalent: 1120000,
      requester: 'Dr. Ethan Park',
      department: 'Web Development',
      status: 'Pending',
      date: '2025-04-03',
      desc: 'Create a web platform for HR management.',
      docs: ['HR_Plan.pdf'],
      risk: 'Medium',
      roi: '22%',
      urgency: 'High',
      teamSize: 12,
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      securityScore: 90,
      volatilityIndex: 45,
      imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
      company: 'HRFlow',
      client: 'Workday',
      requirements: 'Employee records, payroll integration.',
    },
    {
      id: 27,
      title: 'Photo Sharing App',
      amount: 9,
      usdEquivalent: 630000,
      requester: 'Elena Russo',
      department: 'App Development',
      status: 'Rejected',
      date: '2025-03-15',
      desc: 'Develop a mobile app for photo sharing.',
      docs: ['Photo_App.pdf'],
      risk: 'Low',
      roi: '15%',
      urgency: 'Medium',
      teamSize: 7,
      walletAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      securityScore: 91,
      volatilityIndex: 30,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'SnapShare',
      client: 'Instagram',
      requirements: 'Photo filters, social sharing.',
    },
    {
      id: 28,
      title: 'Inventory Management Web',
      amount: 14,
      usdEquivalent: 980000,
      requester: 'Dr. Priya Sharma',
      department: 'Web Development',
      status: 'Pending',
      date: '2025-04-06',
      desc: 'Build a web platform for inventory management.',
      docs: ['Inventory_Plan.pdf'],
      risk: 'Medium',
      roi: '20%',
      urgency: 'High',
      teamSize: 10,
      walletAddress: '1BoatSLRHtKNngkdXEeobR76b53LETtpyT',
      securityScore: 89,
      volatilityIndex: 45,
      imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      company: 'StockSync',
      client: 'Oracle',
      requirements: 'Stock tracking, reporting tools.',
    },
    {
      id: 29,
      title: 'Music Streaming App',
      amount: 28,
      usdEquivalent: 1960000,
      requester: 'Dr. Leila Hossein',
      department: 'App Development',
      status: 'Pending',
      date: '2025-04-07',
      desc: 'Develop a mobile app for music streaming.',
      docs: ['Music_App.pdf'],
      risk: 'High',
      roi: '30%',
      urgency: 'Critical',
      teamSize: 13,
      walletAddress: '1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF',
      securityScore: 87,
      volatilityIndex: 55,
      imageUrl: 'https://images.pexels.com/photos/164686/pexels-photo-164686.jpeg',
      company: 'TunePeak',
      client: 'Spotify',
      requirements: 'Playlists, offline playback.',
    },
    {
      id: 30,
      title: 'Project Management Web',
      amount: 10,
      usdEquivalent: 700000,
      requester: 'Sophia Nguyen',
      department: 'Web Development',
      status: 'Approved',
      date: '2025-03-09',
      desc: 'Create a web platform for project management.',
      docs: ['Project_Plan.pdf'],
      risk: 'Low',
      roi: '15%',
      urgency: 'Medium',
      teamSize: 8,
      walletAddress: '3EktnHQD7RiAE6uzMj2ZifT9YgRrkSgzQX',
      securityScore: 92,
      volatilityIndex: 30,
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      company: 'TaskFlow',
      client: 'Asana',
      requirements: 'Task assignment, timeline views.',
    },
  ];