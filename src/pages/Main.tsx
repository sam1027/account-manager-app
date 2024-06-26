import HelmetTitle from "../components/HelmetTitle";

function Main() {
    return (
        <div>
            <HelmetTitle title="홈" />
            Main
            <br />
            <a href="/oauth2/authorization/google">로그인</a>
        </div>
    );
}

export default Main;