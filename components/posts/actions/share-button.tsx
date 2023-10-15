import SvgButton from "@/components/SvgButton";
import svgs from "@/data/svgs";
import React from "react";

export default function ShareButton() {
    return (
        <div>
            <SvgButton
                path={svgs.shareWhispTo.path}
                ariaLabel={svgs.shareWhispTo.ariaLabel}
                viewBox={svgs.shareWhispTo.viewBox}
                onClick={() => {}}
                className="fill-slate-500 stroke-none hover:fill-current "
                size="w-5 h-5"
            />
        </div>
    );
}
