import React, { useEffect, useState } from "react"
import { LIST_ACTIONS } from "../ListReducer";
import { DropdownContainer, DropdownText, DropdownIcon, DropdownModal, DropdownOption } from "./style";

export type DropdownOption = 'All' | 'Favorites' | 'Forwarded';

interface DropdownProps {
    dispatch: React.Dispatch<any>,
}

export const Dropdown = ({ dispatch }: DropdownProps) => {
    const [dropdownContent, setDropdownContent] = useState<DropdownOption>('All');
    const [displayDropdownModal, setDisplayDropdownModal] = useState(false);

    useEffect(() => {
        document.addEventListener(
            "click",
            function (event) {
                var clicked = event.target as Element;
                var dropdown = document.getElementById('dropdown')

                if (
                    clicked != dropdown && !dropdown?.contains(clicked)
                ) {
                    setDisplayDropdownModal(false)
                }
            },
            false
        )
    }, []);

    const handleSetDropdownContent = (category: DropdownOption) => {
        setDropdownContent(category);
        dispatch({ type: LIST_ACTIONS.TOGGLE_DROPDOWN_OPTION, payload: category });
    }

    return (
        <DropdownContainer id="dropdown" onClick={() => setDisplayDropdownModal(!displayDropdownModal)}>
            <DropdownText>{dropdownContent}</DropdownText>
            <DropdownIcon />
            {displayDropdownModal && <DropdownModal>
                <DropdownOption onClick={() => handleSetDropdownContent('All')}> All</DropdownOption>
                <DropdownOption onClick={() => handleSetDropdownContent('Favorites')}>Favorites</DropdownOption>
                {/* <DropdownOption onClick={() => handleSetDropdownContent('Forwarded')}>Forwarded</DropdownOption> */}
            </DropdownModal>
            }
        </DropdownContainer>
    )

}