import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React from "react";
import "./featuredInfo.css";
import { useState, useEffect } from "react";
import { userRequest } from "../../networkRequest";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [percentage, serPercentage] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        serPercentage((res.data[1].total * 100) / res.data[0].total - 100);
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
  }, []);

  console.log("percentage", percentage);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[0]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(percentage)}
            {percentage < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon positive" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,212</span>
          <span className="featuredMoneyRate">
            11.4 <ArrowUpward className="featuredIcon positive" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,212</span>
          <span className="featuredMoneyRate">
            3.4 <ArrowUpward className="featuredIcon positive" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
