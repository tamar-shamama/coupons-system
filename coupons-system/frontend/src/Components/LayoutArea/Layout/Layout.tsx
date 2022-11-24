import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import background from "../../../Assets/Images/background9.jpg";

function Layout(): JSX.Element {
    return (
        <div className="Layout" style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
			
            <header>
                <Header/>
                <hr />
            </header>
            <aside><Menu/></aside>
            <main><Routing/></main>
            <footer><Footer/></footer>


        </div>
    );
}

export default Layout;
