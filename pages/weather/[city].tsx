import styles from "../../styles/stylesCity.module.scss";

import { GetServerSideProps } from "next";
import MainContainer from "../../components/MainContainer";
import { useRouter } from "next/router";

type TDataWeather = {
  cod: number;
  main: {
    temp: number;
  };
  name: string;
  sys: {
    country: string;
  };
  wind: { speed: number };
};

type TErrorData = {
  cod: string;
  message: string;
};

type TPropsCity = {
  dataWeather: TErrorData & TDataWeather;
};

const City = (props: TPropsCity) => {
  const router = useRouter();

  const nowDate = new Date();

  return (
    <MainContainer isLinkToMainPage={true}>
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>

      {props.dataWeather.cod !== 200 ? (
        <>
          <span className={styles.error}>
            {JSON.stringify(props.dataWeather)}
          </span>
        </>
      ) : (
        <>
          <section>
            <h1>
              CITY <span>{props.dataWeather.name}</span>,{" "}
              {props.dataWeather.sys.country}
            </h1>

            <div>
              Time update: {nowDate.getHours()}:{nowDate.getMinutes()}:
              {nowDate.getSeconds()}
            </div>

            <div>Temperature: {props.dataWeather.main.temp} &#176;С</div>
            <div>Wind: {props.dataWeather.wind.speed} m/s</div>
          </section>
        </>
      )}
    </MainContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const reqWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${context.query.city}&units=metric&appid=e5d212d15adfa4627f285fb9606c2c21`
  );
  const dataWeather = await reqWeather.json();

  return {
    props: { dataWeather },
    // revalidate: 60,
  };
};

export default City;
