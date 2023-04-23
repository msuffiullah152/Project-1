import { useState, useEffect } from "react";
import "../App.css";
function NavBar() {
  const [conversionRates, setConversionRates] = useState({});
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [lastestRefreshTime, setLastestRefreshTime] = useState(null);
  const [stopRefetch, setStopRefetch] = useState(false);

  const dataFetch = async () => {
    try {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const data = await response.json();
      setConversionRates(data.bpi);
      setLastestRefreshTime(data.time.updated);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dataFetch();
  }, []);

  const handleUpdatedCurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleUpdatedAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleRefetch = () => {
    if (!stopRefetch) {
      dataFetch();
      setStopRefetch(true);
      setTimeout(() => {
        setStopRefetch(false);
      }, 300000);
    } else {
      alert("Please wait 5 minutes before refreshing again");
    }
  };

  const sortedRates = Object.entries(conversionRates).sort((a, b) => {
    return a[1].rate_float - b[1].rate_float;
  });

  return (
    <div>
      <h3 className="screen"data-testid="conversion">Current Conversion Rates</h3>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-center text-sm font-light">
                <thead class="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                  <tr>
                    <th scope="col" class=" px-6 py-4">
                      #
                    </th>
                    <th scope="col" class=" px-6 py-4">
                      Currency
                    </th>
                    <th scope="col" class=" px-6 py-4">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap  px-6 py-4 font-medium">1</td>
                    <td class="whitespace-nowrap  px-6 py-4">USD/BTC</td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {conversionRates.USD?.rate_float.toFixed()} USD
                    </td>
                  </tr>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap  px-6 py-4 font-medium">2</td>
                    <td class="whitespace-nowrap  px-6 py-4 ">EUR/BTC</td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {conversionRates.EUR?.rate_float.toFixed()} EUR
                    </td>
                  </tr>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap  px-6 py-4 font-medium">3</td>
                    <td class="whitespace-nowrap  px-6 py-4">GBP/BTC</td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {conversionRates.GBP?.rate_float.toFixed()} GBP
                    </td>
                  </tr>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap  px-6 py-4 font-medium">4</td>
                    <td class="whitespace-nowrap  px-6 py-4">BTC/USD</td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {1 / conversionRates.USD?.rate_float} BTC
                    </td>
                  </tr>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap  px-6 py-4 font-medium">5</td>
                    <td class="whitespace-nowrap  px-6 py-4">BTC/EUR</td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {1 / conversionRates.EUR?.rate_float} BTC
                    </td>
                  </tr>
                  <tr class="border-b dark:border-neutral-500">
                    <td class="whitespace-nowrap  px-6 py-4 font-medium">6</td>
                    <td class="whitespace-nowrap  px-6 py-4">BTC/GBP</td>
                    <td class="whitespace-nowrap  px-6 py-4">
                      {1 / conversionRates.GBP?.rate_float} BTC
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="h1">Conversion Table</p>
              <select value={currency} onChange={handleUpdatedCurrency}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={handleUpdatedAmount}
              />
              = {(1 / conversionRates[currency]?.rate_float) * amount} BTC
              <p class="text-sm ...">Last Updated on {lastestRefreshTime} </p>
              <button className="refetch" onClick={handleRefetch}>
                Refetch
              </button>
              <br></br>
              <p className="label"> &copy;MUHAMMAD SUFFIULLAH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
