import SvgButton from "@/components/SvgButton";
import svgs from "@/data/svgs";
import React from "react";

export default function RepostButton() {
    return (
        <div>
            <SvgButton
                path={svgs.repostIcon.path}
                ariaLabel={svgs.repostIcon.ariaLabel}
                viewBox={svgs.repostIcon.viewBox}
                onClick={() => {}}
                className="fill-slate-300 stroke-none hover:fill-current "
                size="w-6 h-6"
            />
        </div>
    );
}
