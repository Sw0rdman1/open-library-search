import './Navbar.css';
import ThemeSwitch from '../theme-switch/ThemeSwitch';

const NAV_ITEMS = [
    { name: 'Browse', link: '/' },
    { name: 'History', link: '/history' },
]

export const Navbar: React.FC = () => {
    const currentPath = window.location.pathname || '/';

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-title">
                    <h1>Biblios</h1>
                </div>

                {/* Menu items in center */}
                <div className="navbar-menu">
                    {NAV_ITEMS.map((item) => (
                        <a key={item.name} href={item.link} className={`menu-item ${currentPath === item.link ? 'active' : ''}`}>
                            {item.name}
                        </a>
                    ))}
                </div>

                <ThemeSwitch />
            </div>
        </nav>
    );
};
