
import { Helmet } from 'react-helmet-async';

interface IHelmetTitle{
    title: string;
}

function HelmetTitle({title}:IHelmetTitle) {
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
}

export default HelmetTitle;