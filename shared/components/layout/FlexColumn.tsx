import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement>;

export const FlexColumn: FC<Props> = ({ className, children, ...divProps }) => {
    return (
        <div className={twMerge("flex flex-col", className)} {...divProps}>
            {children}
        </div>
    );
};

