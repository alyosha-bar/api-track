import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {

    // change the socials
    const socials = [
        { href: 'https://www.linkedin.com/in/aleksej-barysnikov-b93426255/', icon: faLinkedin, label: 'LinkedIn' },
        { href: 'https://aleksejbarysnikov.netlify.app/', icon: faGlobe, label: 'Website' },
        { href: 'https://www.github.com/alyosha-bar', icon: faGithub, label: 'Github' },
        { href: '', icon: faEnvelope, label: 'Mail'}
    ];
    

    return ( 
        <div className="border-t-2 border-gray-200 bg-white py-8 px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">

                {/* Social Links */}
                <div className="flex justify-center space-x-6">
                {socials.map((social, index) => (
                    <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-500 transition duration-300"
                    aria-label={social.label}
                    >
                    <FontAwesomeIcon icon={social.icon} size="lg" />
                    </a>
                ))}
                </div>

                {/* Feedback Message + CTA */}
                <div className="w-100 flex items-center space-x-6">
                    <p className="text-sm text-gray-700 mb-2">
                        This is a beta product — your feedback helps us improve!
                    </p>
                    <a
                        href="https://forms.gle/9e8GzvDSTBkkv9kGA"
                        className="inline-block text-sm text-white bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-lg shadow"
                    >
                        Feedback Form
                    </a>
                </div>

            </div>
            </div>
    );
}
 
export default Footer;