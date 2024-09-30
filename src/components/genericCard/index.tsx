import React from "react";
import styled from "styled-components";

interface CardProps {
    title: string;
    price: string;
    description: string;
    textButton: string;
    onClickFunction: () => void;
}

const Card: React.FC<CardProps> = ({ title, price, textButton, onClickFunction }) => {
    return (
        <StyledWrapper>
            <div className="card">
                <div className="card-img" />
                <div className="card-info">
                    <p className="text-title">{title}</p>
                    
                </div>
                <div className="card-footer">
                    <span className="text-title">{price}</span>
                    <div className="card-button">
                        <button onClick={onClickFunction}>{textButton}</button>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .card {
    width: 220px;
    height: 300px;
    padding: 1em;
    background: #ffffff;
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }

 

  .card-img {
    background-color: #ffe0b2;
    height: 40%;
    width: 100%;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card-info {
    padding-top: 15px;
  }

  .text-title {
    font-weight: 700;
    font-size: 1.2em;
    line-height: 1.4;
    color: #333;
    margin-bottom: 0.5em;
  }

  .text-body {
    font-size: 0.9em;
    color: #777;
    margin-bottom: 1em;
  }

  .card-footer {
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #eee;
  }

  .card-footer .text-title {
    font-weight: 600;
    font-size: 1.1em;
    color: #333;
  }

  .card-button button {
    padding: 0.5em 1em;
    font-size: 0.9em;
    font-weight: 600;
    color: #fff;
    background-color: #ff7043;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

`;

export default Card;
