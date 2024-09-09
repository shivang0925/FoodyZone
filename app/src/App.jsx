import { useState, useEffect } from "react";
import styled from "styled-components";
import Cards from "./components/cards";

export const BASE_URL = "http://localhost:9000";

function App() {
  const [data, setData] = useState(null);
  const [selectSearch, setSelectSearch] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setSelectSearch(json);
        setDataLoading(false);
        setSelectedBtn(json);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };

    fetchData();
  }, []);

  console.log(data);

  const searchFood = (e) => {
    const searchValue = e.target.value;
    if (searchValue == "") {
      setSelectSearch(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSelectSearch(filter);
  };

  const handleBtn = (type) => {
    if (selectedBtn === "all") {
      setSelectSearch(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setSelectSearch(filter);
    setSelectedBtn(type);
  };

  const foodBtn = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (dataLoading) return <div>loading....</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="images/Foody_Zone.png" alt="logo" />
          </div>

          <div className="search">
            <input onChange={searchFood} placeholder="Search Food..." />
          </div>
        </TopContainer>

        <FilterContainer>
          {foodBtn.map((value) => (
            <Button key={value.name} onClick={() => handleBtn(value.type)}>
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <Cards data={selectSearch} />
    </>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 90px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background-color: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #8d474f;
  }
`;
