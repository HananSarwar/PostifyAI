// Platform SVG Icons
export const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#0077B5"/>
    <path d="M7.5 9.5H5V19H7.5V9.5Z" fill="white"/>
    <circle cx="6.25" cy="6.75" r="1.5" fill="white"/>
    <path d="M19 19H16.5V14C16.5 12.9 15.85 12 14.75 12C13.65 12 13 12.9 13 14V19H10.5V9.5H13V10.75C13.55 9.9 14.6 9.25 15.75 9.25C17.6 9.25 19 10.65 19 12.5V19Z" fill="white"/>
  </svg>
)

export const TwitterXIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#000000"/>
    <path d="M17.5 4H19.9L14.7 9.9L20.8 18H16L12.2 13.1L7.8 18H5.4L10.9 11.7L5 4H9.9L13.4 8.5L17.5 4ZM16.7 16.5H18L9.2 5.5H7.8L16.7 16.5Z" fill="white"/>
  </svg>
)

export const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F58529"/>
        <stop offset="50%" stopColor="#DD2A7B"/>
        <stop offset="100%" stopColor="#8134AF"/>
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill="url(#igGrad)"/>
    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8" fill="none"/>
    <circle cx="17" cy="7" r="1.2" fill="white"/>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="white" strokeWidth="1.5" fill="none"/>
  </svg>
)

export const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#1877F2"/>
    <path d="M13.5 8H15.5V5.5H13.5C11.8 5.5 10.5 6.8 10.5 8.5V10H8.5V12.5H10.5V19H13V12.5H15L15.5 10H13V8.5C13 8.2 13.2 8 13.5 8Z" fill="white"/>
  </svg>
)

export const PostifyLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="22" fill="#FFFFFF"/>
    <rect x="28" y="25" width="12" height="50" rx="6" fill="#0F0F0F"/>
    <path d="M40 25 Q75 25 75 42.5 Q75 60 40 60" fill="none" stroke="#0F0F0F" strokeWidth="12" strokeLinecap="round"/>
  </svg>
)

// Platform info config — use this everywhere
export const PLATFORMS = {
  linkedin: {
    name: 'LinkedIn',
    description: 'Professional network',
    color: '#0077B5',
    bg: '#E8F4FB',
    Icon: LinkedInIcon,
    available: true,
  },
  twitter: {
    name: 'Twitter / X',
    description: 'Microblogging platform',
    color: '#000000',
    bg: '#2A2A2A',
    Icon: TwitterXIcon,
    available: false,
  },
  instagram: {
    name: 'Instagram',
    description: 'Photo & video sharing',
    color: '#DD2A7B',
    bg: '#2A2A2A',
    Icon: InstagramIcon,
    available: false,
  },
  facebook: {
    name: 'Facebook',
    description: 'Social media platform',
    color: '#1877F2',
    bg: '#2A2A2A',
    Icon: FacebookIcon,
    available: false,
  },
}