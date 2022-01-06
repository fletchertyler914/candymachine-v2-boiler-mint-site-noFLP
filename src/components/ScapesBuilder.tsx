import { useEffect, useMemo, useState } from 'react';
import Select, {
  components,
  GroupBase,
  SingleValue,
  StylesConfig,
} from 'react-select';
import { IElementData, IScapesElementData } from '../models/ElementResponseData';
import IImageData from '../models/ImageData';
import Switch from 'react-switch';
import ReactTooltip from 'react-tooltip';

interface SelectOption {
  key: string;
  label: string;
  value: string;
}

export const ScapesBuilder = ({
  scapeModel,
  defaultOptionIndex,
  availableElementOptions,
  updateElement,
  updateElementAndBuild,
  sendBuildImageRequest,
  openMobileScape,
  isMobileScapeVisible,
}: {
  scapeModel?: IImageData;
  defaultOptionIndex: number;
  availableElementOptions: IScapesElementData[];
  updateElement: (elementToUpdate: Partial<IImageData>) => void;
  updateElementAndBuild: (elementToUpdate: Partial<IImageData>) => void;
  sendBuildImageRequest: () => void;
  openMobileScape: () => void;
  isMobileScapeVisible: boolean;
}) => {
  // Bubbles Checkbox State
  const [checked, setChecked] = useState(false);
  const [toggleDisabled, setToggleDisabled] = useState(false);

  const customStyles = (
    elementOption: IScapesElementData
  ): StylesConfig<SelectOption, false, GroupBase<SelectOption>> => {
    const config: StylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
      option: (provided: any, state: { data: { value: any } }) => {
        let backgroundColor = '#fff';

        // Highlight Whitelist Options
        const whitelistValues = elementOption.elements.reduce(
          (whitelist, option) => {
            if (option.isPreSeason || option.isWhitelisted) {
              return whitelist.concat(option.id);
            }
            return whitelist;
          },
          [] as number[]
        );

        if (whitelistValues.includes(Number(state.data.value))) {
          backgroundColor = '#FFF2C6 !important';
        }

        return { ...provided, cursor: 'pointer', backgroundColor };
      },
      control: (styles: any) => {
        return {
          ...styles,
          cursor: 'pointer',
          boxShadow: 'none',
        };
      },
    };
    return config;
  };

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <svg
          width='12'
          height='5'
          viewBox='0 0 12 5'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M6 5L0.803849 0.5L11.1962 0.500001L6 5Z' fill='black' />
        </svg>
      </components.DropdownIndicator>
    );
  };

  const handleToggleChange = (checked: boolean) => {
    // Update Bubbles Checkbox State
    setChecked(checked);

    // Map Checked Value To Element Value
    // 93 === ON / 94 === OFF
    const elementToUpdate = {
      ColorPops: checked ? 93 : 94,
    };

    // Update Scape Model
    if (!isMobileScapeVisible) {
      updateElementAndBuild(elementToUpdate);
    } else {
      updateElement(elementToUpdate);
    }
  };

  const mapOptionElement = (element: IElementData): SelectOption => {
    return {
      key: `${element.id}-${element.name}`,
      label: element.name,
      value: element.id.toString(),
    };
  };

  const mapOptionElements = (elements: IElementData[]) =>
    elements.map(mapOptionElement);

  const updateScapeElement = ({
    elementData,
    elementOption,
  }: {
    elementData: IElementData;
    elementOption: IScapesElementData;
  }) => {
    if (elementOption.elements.some((e) => e.id === elementData.id)) {
      const elementToUpdate: Partial<IImageData> = {
        [elementOption.name]: elementOption.elements.find(
          (e) => e.id === elementData.id
        )?.id,
      };

      if (!isMobileScapeVisible) {
        updateElementAndBuild(elementToUpdate);
      } else {
        updateElement(elementToUpdate);
      }
    }
  };

  const SelectElement = (
    elementName: string,
    elementOption: IScapesElementData
  ) => {
    const options = mapOptionElements(elementOption.elements);
    const defaultOption = mapOptionElements(elementOption.elements)[
      defaultOptionIndex
    ];

    return (
      <div className='select-wrapper' key={elementOption.name}>
        <label>{elementName}</label>
        <Select
          classNamePrefix='selectStyles'
          defaultValue={defaultOption}
          components={{ DropdownIndicator }}
          options={options}
          isSearchable={false}
          styles={customStyles(elementOption)}
          onChange={(newValue: SingleValue<SelectOption>) =>
            updateScapeElement({
              elementData: {
                id: Number(newValue?.value),
                name: newValue?.label as string,
              },
              elementOption: elementOption as IScapesElementData,
            })
          }
        />
      </div>
    );
  };

  const BubblesToggle = () => (
    <>
      <div
        className='react-switch-wrapper'
        style={{ margin: isMobileScapeVisible ? '0 0 6px 0' : '10px 0 0 0' }}
        data-tip={
          toggleDisabled
            ? 'Color Pops aren\'t compatible with Night, Vaporwave, or Northern Lights backgrounds. Switch to a different background to reactivate.'
            : ''
        }
      >
        <Switch
          onChange={handleToggleChange}
          checked={checked}
          className='react-switch'
          offColor='#fff'
          onColor='#fff'
          offHandleColor='#BBBBBB'
          onHandleColor='#000'
          activeBoxShadow='none'
          height={18}
          width={28}
          handleDiameter={14}
          disabled={toggleDisabled}
        />
        <span
          className={checked ? '' : 'react-switch-text-state-off'}
          style={{ cursor: toggleDisabled ? 'default' : 'pointer' }}
        >
          {isMobileScapeVisible ? 'Bubbles' : checked ? 'ON' : 'OFF'}
        </span>
      </div>
      <ReactTooltip />
    </>
  );

  const isToggleDisabled = useMemo(
    () =>
      scapeModel ? [102, 103, 157].includes(scapeModel.Background) : false,
    [scapeModel]
  );

  useEffect(() => {
    if (isToggleDisabled !== toggleDisabled) {
      setToggleDisabled(isToggleDisabled);
    }
  }, [toggleDisabled, isToggleDisabled]);

  useEffect(() => {
    if (scapeModel?.ColorPops === 93) {
      if (!isMobileScapeVisible) {
        updateElementAndBuild({ ColorPops: 94 });
      } else {
        updateElement({ ColorPops: 94 });
      }
    }
  }, [
    scapeModel,
    isToggleDisabled,
    isMobileScapeVisible,
    updateElementAndBuild,
    updateElement,
  ]);

  return (
    <>
      {!isMobileScapeVisible && availableElementOptions.length > 0 && (
        <div className='show-md'>
          <div className='selects-container'>
            {availableElementOptions.map((option: IScapesElementData) =>
              SelectElement(option.displayName, option)
            )}
            <div className='select-wrapper'>
              <label className='pointer'>
                <span>Bubbles</span>
                <BubblesToggle />
              </label>
            </div>
          </div>
        </div>
      )}
      {isMobileScapeVisible && availableElementOptions.length > 0 && (
        <div className={'mobile-scape mobile-scape--show'}>
          <div className='container'>
            <div className='mobile-scape__inner-container'>
              <div>
                <div className='mobile-scape__headline mb-20'>
                  Select different elements to change the Scape
                </div>
                <div className='mobile-scape__selects mb-20 '>
                  {availableElementOptions.map((option: IScapesElementData) =>
                    SelectElement(option.displayName, option)
                  )}
                  <div className='mobile-scape__selects__select'>
                    <BubblesToggle />
                  </div>
                </div>
                <div className='mobile-scape__btn-wrapper mb-20'>
                  <button
                    className='btn btn-border full-width'
                    onClick={() => sendBuildImageRequest()}
                  >
                    Work your magic
                  </button>
                </div>
                <div className='flex flex-center'>
                  <a
                    className='mobile-scape__btn-reset'
                    onClick={openMobileScape}
                  >
                    Reset
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
