import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {

    // change the socials
    const socials = [
        { href: 'https://www.twitter.com', icon: faTwitter, label: 'Twitter' },
        { href: 'https://www.linkedin.com', icon: faLinkedin, label: 'LinkedIn' },
        { href: 'https://www.instagram.com', icon: faGlobe, label: 'Website' },
        { href: 'https://www.github.com', icon: faGithub, label: 'Github' },
    ];
    

    return ( 
        <div className="flex items-center justify-between border-t-2 border-gray-200">

            <div className="flex space-x-16 justify-center items-center mt-8 w-3/5">
            {socials.map((social, index) => (
                <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 transition duration-300 ease-in-out"
                aria-label={social.label}
                >
                <FontAwesomeIcon icon={social.icon} size="2x" />
                </a>
            ))}
            </div>

            <div className="flex flex-col p-12 w-2/5">
                <h2 className="text-sm p-2">This is an beta product, so I would greatly appreciate feedback on features and what you would like to see.</h2>
                <a href="#" className="p-2 text-blue-500 underline hover:text-blue-700 transition-colors duration-300"> Fill out this form. </a>
            </div>
        </div>
    );
}
 
export default Footer;