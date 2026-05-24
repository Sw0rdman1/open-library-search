import { Book } from 'lucide-react'

import './SocialProof.css';
import { getRandomAvatars } from '../../utils/getRandomAvatars';
import { useMemo } from 'react';


const SocialProof = () => {
    const avatars = useMemo(() => getRandomAvatars(3), []);

    return (
        <div className="social-proof-wrapper">
            <div className="info-container">
                <Book color='var(--accent)' size={24} />
                <p>Discover millions of books around the world and find your next favorite read</p>
            </div>
            <div className="social-proof-container">
                <div className="avatars">
                    {avatars.map((avatar, index) => (
                        <img
                            key={avatar}
                            src={avatar}
                            alt={`User ${index + 1}`}
                            className="avatar"
                            loading="lazy"
                            decoding="async"
                        />
                    ))}
                </div>
                <p className="social-text">
                    Join over <span className="highlight">100,000</span> book lovers
                </p>
            </div>
        </div>
    )
}

export default SocialProof