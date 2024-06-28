import React from "react";
import {Image} from "@nextui-org/react";

export default function ImageJs({ id }) {
    return (
        <div className="image-container">
            <p className="texto">Always remember Paula... !You are AMAZING¡</p>
            <Image
                isBlurred
                width={240}
                src={require(`../Imagenes/${id}`)}
                alt="NextUI Album Cover"
                className="m-5"
            />
        </div>
    );
}