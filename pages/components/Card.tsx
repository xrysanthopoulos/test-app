import React from 'react';
import Image from 'next/image'
import CardStyle from '../styles/Card.module.css';

interface CardProps {
  data: {
    name: string;
    rating: number;
    meal_plan: string;
    city: string;
    price: number;
    photo: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className={CardStyle.card}>
      <div className={CardStyle.cardImage}>
        {/* Card Image */}
        <Image width={100} height={100} src={data.photo} alt="Property" />
      </div>
      <div className={CardStyle.cardContent}>
        {/* Card Content */}
        <span>{data.city}</span>
        <p>{data.name}</p>
        <p>{data.meal_plan}</p>
      </div>
      <div className={CardStyle.cardAction}>
        {/* Card Action */}
        <div className={CardStyle.leftText}>
          <p><span>ΑΠΟ</span>{data.price}€</p>
        </div>
        <div className={CardStyle.rightButton}>
          <button>Κράτηση</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
