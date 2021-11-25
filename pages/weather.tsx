import styles from "../styles/stylesWeather.module.scss";

import { useRouter } from "next/router";
import MainContainer from "../components/MainContainer";

const Weather = () => {
  const router = useRouter();

  const onSubmitForm = (e: any) => {
    const {
      inputText: { value },
    } = e.currentTarget;

    e.preventDefault();
    router.push(`weather/${value}`);
  };

  return (
    <MainContainer isLinkToMainPage={true}>
      <section>
        <h1>WEATHER</h1>

        <form onSubmit={onSubmitForm} autoComplete="off">
          <input
            type="text"
            name="inputText"
            placeholder="Enter the city in English"
            autoComplete="off"
          />
          <button type="submit" onClick={onSubmitForm}>
            Show weather
          </button>
        </form>
      </section>
    </MainContainer>
  );
};

export default Weather;
