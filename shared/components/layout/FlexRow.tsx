import { FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = HTMLAttributes<HTMLDivElement>;

export const FlexRow: FC<Props> = ({ className, children, ...divProps }) => {
    return (
        <div className={twMerge("flex flex-row", className)} {...divProps}>
            {children}
        </div>
    );
};

