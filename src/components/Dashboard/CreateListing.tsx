import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  InputBase,
  Typography,
  Select,
  MenuItem,
  CardMedia,
  Grow,
  useTheme,
  TextareaAutosize,
  Tooltip,
  Chip,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import Pfp1 from "../../assets/images/placeholder.png";
import Pfp2 from "../../assets/images/placeholder.png";
import Pfp3 from "../../assets/images/placeholder.png";
import Pfp4 from "../../assets/images/placeholder.png";
import PfpMain from "../../assets/images/placeholder.png";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { AuthContext } from "../../context/auth-context.tsx";
import slugify from "slugify";
import { useLocation, useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import ConfirmModal from "../UI/ConfirmModal";
// import formData from "../../utils/formData.js";
import { DashboardContext } from "../../context/DashboardContext.js";
import { PendingCounterContext } from "../../context/pending-counter";
import ConfirmModal from "../UI/ConfirmModal.js";


// Temporary formData until the actual file is available
const formData = [
  {
    name: "Banner Title",
    type: "text",
    placeholder: "Enter banner title",
    maxLength: 100,
    minLength: 10,
  },
  {
    name: "City",
    type: "text",
    placeholder: "Enter city",
    maxLength: 50,
    minLength: 2,
  },
  {
    name: "Area",
    type: "text",
    placeholder: "Enter area",
    maxLength: 50,
    minLength: 2,
  },
  {
    name: "Phone",
    type: "text",
    placeholder: "Enter phone number",
    maxLength: 15,
    minLength: 10,
  },
  {
    name: "Street",
    type: "text",
    placeholder: "Enter street address",
    maxLength: 100,
    minLength: 5,
  },
  {
    name: "Website",
    type: "text",
    placeholder: "Enter website URL",
    maxLength: 200,
    minLength: 10,
  },
  {
    name: "Map Embed (src)",
    type: "text",
    placeholder: "Enter map embed URL",
    maxLength: 500,
    minLength: 20,
  },
  {
    name: "Banner Intro",
    type: "textarea",
    placeholder: "Enter banner introduction",
    maxLength: 500,
    minLength: 50,
  },
  {
    name: "About us",
    type: "textarea",
    placeholder: "Enter about us description",
    maxLength: 1000,
    minLength: 100,
  },
  {
    name: "Why us",
    type: "textarea",
    placeholder: "Enter why choose us",
    maxLength: 500,
    minLength: 50,
  },
  {
    name: "Latest Projects Intro",
    type: "textarea",
    placeholder: "Enter latest projects introduction",
    maxLength: 500,
    minLength: 50,
  },
  {
    name: "Our Mission",
    type: "textarea",
    placeholder: "Enter our mission",
    maxLength: 500,
    minLength: 50,
  },
  {
    name: "Contact us Intro",
    type: "textarea",
    placeholder: "Enter contact us introduction",
    maxLength: 500,
    minLength: 50,
  },
  {
    name: "Category",
    type: "select",
    placeholder: "Select category",
    options: ["Technology", "Healthcare", "Finance", "Education", "Retail", "Other"],
  },
  {
    name: "Region",
    type: "select",
    placeholder: "Select region",
    options: ["North", "South", "East", "West", "Central"],
  },
  {
    name: "Price Range",
    type: "select",
    placeholder: "Select price range",
    options: ["$", "$$", "$$$", "$$$$"],
  },
  {
    name: "Services",
    type: "select",
    placeholder: "Select services",
    options: ["Accounting", "Tax Services", "Bookkeeping", "Financial Planning", "Auditing", "Others"],
  },
];

interface CreateListingProps {
  triggerResetForm: boolean;
  setTriggerResetForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormDataItem {
  name: string;
  type: string;
  placeholder: string;
  maxLength?: number;
  minLength?: number;
  options?: string[];
}

interface ImageErrors {
  logo: string;
  banner: string;
  image0: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}

interface FormErrors {
  [key: string]: string;
}

interface User {
  username: string;
}

interface DashboardContextType {
  user: User | null;
}

interface PendingCounterContextType {
  counter: number;
  setCounter: (value: number) => void;
}

const CreateListing: React.FC<CreateListingProps> = ({ triggerResetForm, setTriggerResetForm }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { enqueueSnackbar } = useSnackbar();
  const auth = useContext(AuthContext);
  const [logoImage, setLogoImage] = useState<string>(PfpMain);
  const [mainImage, setMainImage] = useState<string>(PfpMain);
  const [bannerImage, setBannerImage] = useState<string>(PfpMain);
  const [desc, setDesc] = useState<string>("");
  const [category, setCategory] = useState<string[]>([]);
  const [region, setRegion] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [website, setWebsite] = useState<string>("https://www.example.com/");
  const [mapUrl, setMapUrl] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [about, setAbout] = useState<string>(
    "We turn your dreams into reality. With our expert guidance and personalized approach, we make every step of your journey smooth and enjoyable. Your satisfaction is our utmost priority. Together, we'll transform your aspirations into achievements, ensuring every moment is met with excellence and care "
  );
  const [whyUs, setWhyUs] = useState<string>("");

  const [latestProjectsIntro, setLatestProjectsIntro] = useState<string>(
    "Explore the latest projects from us, where innovation meets excellence. Our current ventures showcase our commitment to quality and our dedication to meeting evolving market needs. Stay tuned with us. Our current ventures showcase our commitment to quality and our dedication to meeting evolving market needs. Discover how our cutting-edge solutions are transforming industries and setting new standards for the future. Stay tuned with us"
  );
  const [ourMission, setOurMission] = useState<string>("");

  const [contactUsIntro, setContactUsIntro] = useState(
    "We’d love to hear from you! We're here to answer your questions and provide the support you need. Whether you’re looking for more information, have a specific inquiry, or just want to discuss your needs, our team is ready to assist. Reach out today and let us help you turn your goals into reality with personalized and attentive service."
  );
  const [accNtax, setAccNtax] = useState<string[]>([]);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [hasUploadedImages, setHasUploadedImages] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnyFieldTooShort, setIsAnyFieldTooShort] = useState<boolean>(false);
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [isAnySelectNotSelected, setIsAnySelectNotSelected] = useState<boolean>(false);
  const [isTitleChanged, setIsTitleChanged] = useState<boolean>(false);
  const [titleFromAPI, setTitleFromAPI] = useState<string>("");

  const [otherService, setOtherService] = useState<string>("");
  const [showOtherServiceInput, setShowOtherServiceInput] = useState<boolean>(false);
  const [radioSelected, setRadioSelected] = useState<boolean>(false);
  const [imageErrors, setImageErrors] = useState<ImageErrors>({
    logo: "",
    banner: "",
    image0: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const [image1, setImage1] = useState<string>(Pfp1);
  const [image2, setImage2] = useState<string>(Pfp2);
  const [image3, setImage3] = useState<string>(Pfp3);
  const [image4, setImage4] = useState<string>(Pfp4);

  const [imagePreviews, setImagePreviews] = useState<string[]>([
    Pfp1,
    Pfp2,
    Pfp3,
    Pfp4,
    Pfp4,
  ]);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);
  const image1Ref = useRef<HTMLInputElement>(null);
  const image2Ref = useRef<HTMLInputElement>(null);
  const image3Ref = useRef<HTMLInputElement>(null);
  const image4Ref = useRef<HTMLInputElement>(null);

  const dashboardContext = useContext(DashboardContext) as DashboardContextType;
  const user = dashboardContext?.user;

  const navigate = useNavigate();
  const pendingCounterContext = useContext(PendingCounterContext) as PendingCounterContextType;
  const counter = pendingCounterContext?.counter;
  const setCounter = pendingCounterContext?.setCounter;

  const id = new URLSearchParams(location.search).get("id");

  useEffect(() => {
    if (id) {
      const url =
        type === "listing"
          ? `${backendUrl}/api/places/${id}`
          : `${backendUrl}/api/pendings/getpendig/${id}`;

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setTitle(data.place.title);
          setTitleFromAPI(data.place.title);
          setDesc(data.place.desc);
          if (data.place.address) {
            const addressParts = data.place.address.split(", ");
            setStreet(addressParts[0] || "");
            setArea(addressParts[1] || "");
            setCity(addressParts[2] || "");
            setRegion(addressParts[3] || "");
          }
          setCategory(data.place.category.split(","));
          setMapUrl(data.place.mapUrl);
          setCreator(data.place.creator);
          setWebsite(data.place.website);
          setPhone(data.place.phone);
          setPriceRange(data.place.priceRange);
          setSlug(data.place.slug);
          setIntro(data.place.intro);
          setAbout(data.place.aboutUs);
          setWhyUs(data.place.whyUs);
          setLatestProjectsIntro(data.place.latestProjectIntro);
          setOurMission(data.place.ourMission);
          setContactUsIntro(data.place.contactUsIntro);
          setAccNtax(data.place.accountingAndTaxService);
          setLogoImage(`${backendUrl}/${data.place.businessLogo}` || PfpMain);
          setMainImage(`${backendUrl}/${data.place.image}` || PfpMain);
          setBannerImage(
            ` ${backendUrl}/${data.place.businessBanner}` || PfpMain
          ); // Set banner image state
          const additionalImages = [
            ` ${backendUrl}/${data.place.image1}`,
            `${backendUrl}/${data.place.image2}`,
            `${backendUrl}/${data.place.image3}`,
            `${backendUrl}/${data.place.image4}`,
          ].filter(Boolean);

          setImagePreviews(
            additionalImages.length
              ? additionalImages
              : [Pfp1, Pfp2, Pfp3, Pfp4, Pfp4]
          );
          setImage1(` ${backendUrl}/${data.place.image1}`);
          setImage2(` ${backendUrl}/${data.place.image2}`);
          setImage3(` ${backendUrl}/${data.place.image3}`);
          setImage4(` ${backendUrl}/${data.place.image4}`);
          setHasUploadedImages(true);
        })

        .catch((error) => {
          console.error("Error fetching data:", error);
          setResponseMessage("Error fetching data.");
        });
    }
  }, [id]);

  const generateSlug = (input: string) =>
    slugify(input, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });

  useEffect(() => {
    if (title.trim() !== "") {
      const generatedSlug = generateSlug(title);
      setSlug(generatedSlug);
    }
  }, [title]);

  const handleUploadFromDevice = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string>>, imageType: string) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 130 * 1024) {
        setImageErrors((prevErrors) => ({
          ...prevErrors,
          [imageType]: "Image size exceeds the maximum limit of 130 KB.",
        }));
        return;
      }
      setImageErrors((prevErrors) => ({
        ...prevErrors,
        [imageType]: "",
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageLimit = 5;

    const newImagePreviews = files.slice(0, imageLimit).map((file, index) => {
      const imageType = `image${index}`;
      console.log("imageType", imageType);
      if (file.size > 130 * 1024) {
        setImageErrors((prevErrors) => ({
          ...prevErrors,
          [imageType]: "Image size exceeds the maximum limit of 130 KB.",
        }));
        return Promise.resolve<string | null>(null);
      }

      setImageErrors((prevErrors) => ({
        ...prevErrors,
        [imageType]: "",
      }));

      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onload = () => {
          resolve(reader.result as string);
          setHasUploadedImages(true);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImagePreviews).then((images) => {
      if (images[0]) setMainImage(images[0] || PfpMain);
      if (images[1]) setImage1(images[1]);
      if (images[2]) setImage2(images[2]);
      if (images[3]) setImage3(images[3]);
      if (images[4]) setImage4(images[4]);
    });
  };

  const handleImageClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const resetForm = () => {
    setTitle("");
    setCity("");
    setArea("");
    setStreet("");
    setRegion("");
    setDesc("");
    setCategory([]);
    setMapUrl("");
    setWebsite("https://www.example.com/");
    setPhone("");
    setPriceRange("");
    setSlug("");
    setIntro("");
    setWhyUs("");
    setAbout(
      "We turn your dreams into reality. With our expert guidance and personalized approach, we make every step of your journey smooth and enjoyable. Your satisfaction is our utmost priority. Together, we'll transform your aspirations into achievements. Together, we'll transform your aspirations into achievements, ensuring every moment is met with excellence and care"
    );
    setLatestProjectsIntro(
      "Explore the latest projects from us, where innovation meets excellence. Our current ventures showcase our commitment to quality and our dedication to meeting evolving market needs. Stay tuned with us. Explore the latest projects from us, where innovation meets excellence. Our current ventures showcase our commitment to quality and our dedication to meeting evolving market needs. Discover how our cutting-edge solutions are transforming industries and setting new standards for the future. Stay tuned with us"
    );
    setOurMission("");
    setContactUsIntro(
      "We’d love to hear from you! We're here to answer your questions and provide the support you need. Whether you’re looking for more information, have a specific inquiry, or just want to discuss your needs, our team is ready to assist. Reach out today and let us help you turn your goals into reality with personalized and attentive service."
    );
    setAccNtax([]);
    setImagePreviews([Pfp1, Pfp1, Pfp1, Pfp1]);
    setFormErrors({});
    setLogoImage(PfpMain);
    setMainImage(PfpMain);
    setBannerImage(PfpMain);
    setImage1(Pfp1);
    setImage2(Pfp2);
    setImage3(Pfp3);
    setImage4(Pfp4);
    setLoading(false);
    setInputValues({});
    setErrors({});
  };

  const areAllFieldsFilled = () => {
    const requiredFields = [
      title,
      region,
      city,
      area,
      priceRange,
      street,
      website,
      mapUrl,
      intro,
      about,
      whyUs,
      latestProjectsIntro,
      ourMission,
      contactUsIntro,
      logoImage,
      mainImage,
      image1,
      image2,
      image3,
      image4,
      desc,
    ];

    const allFieldsFilled = requiredFields.every((field) => {
      return typeof field === "string" && field.trim() !== "";
    });
    const isCategoryFilled = Array.isArray(category) && category.length > 0;
    const isServiceFilled = Array.isArray(accNtax) && accNtax.length > 0;

    const imagesMatchConditions =
      image1 !== Pfp1 &&
      image2 !== Pfp2 &&
      image3 !== Pfp3 &&
      image4 !== Pfp4 &&
      mainImage !== PfpMain;

    return (
      allFieldsFilled &&
      isCategoryFilled &&
      hasUploadedImages &&
      isServiceFilled &&
      imagesMatchConditions
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    let errors: FormErrors = {};
    let hasError = false;
    setLoading(true);

    formData.forEach((item: FormDataItem) => {
      if (item.type !== "select") {
        switch (item.name) {
          case "Title":
            if (!title.trim()) {
              errors.title = "Title is required";
              hasError = true;
            }
            break;
          case "City":
            if (!city.trim()) {
              errors.city = "City is required";
              hasError = true;
            }
            break;
          case "Area":
            if (!area.trim()) {
              errors.area = "Area is required";
              hasError = true;
            }
            break;
          case "Phone":
            if (!phone) {
              errors.phone = "Phone no is required";
              hasError = true;
            }
            break;
          case "Street":
            if (!street.trim()) {
              errors.street = "Street is required";
              hasError = true;
            }
            break;
            // case "Services":
            //   if (!accNtax.trim()) {
            //     errors.accNtax = "Services are required";
            //     hasError = true;
            //   }
            break;
          case "Website":
            if (!website.trim()) {
              errors.website = "Website URL is required";
              hasError = true;
            }
            break;
          case "Map Embed (src)":
            if (!mapUrl.trim()) {
              errors.mapUrl = "Map Embed (src) is required";
              hasError = true;
            }
            break;
          case "Banner Intro":
            if (!intro.trim()) {
              errors.intro = "Intro is required";
              hasError = true;
            }
            break;
          default:
            break;
        }
      }
    });

    setFormErrors(errors);
    if (hasError) return;

    try {
      // const accNtaxArray = accNtax.split(",").map((item) => item.trim());
      const payload: Record<string, any> = {
        creator: id ? creator : auth.userId,
        email: auth.userEmail,
        userName: typeof user === "object" && user !== null && "username" in user ? (user as any).username || "" : "",
        typeOfChange: id ? "edit" : "create",
        title,
        desc,
        address: `${street}, ${area}, ${city}, ${region}`,
        category,
        mapUrl,
        website,
        phone,
        priceRange,
        slug,
        intro,
        accountingAndTaxService: accNtax,
        region,
        city,
        area,
        aboutUs: about,
        whyUs,
        latestProjectIntro: latestProjectsIntro,
        ourMission,
        contactUsIntro,
      };

      const fetchAndConvertToBlob = async (imageUrl: string) => {
        try {
          const response = await fetch(imageUrl);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch image: ${response.status} - ${response.statusText}`
            );
          }
          const blob = await response.blob();
          return blob;
        } catch (error) {
          console.error("Error fetching image:", error);
          enqueueSnackbar((error as Error).message, {
            variant: "error",
          });
        }
      };

      const businessLogoBlob = await fetchAndConvertToBlob(
        logoImage !== PfpMain ? logoImage : PfpMain
      );

      const mainImageBlob = await fetchAndConvertToBlob(
        mainImage !== PfpMain ? mainImage : PfpMain
      );

      const businessBannerBlob = await fetchAndConvertToBlob(
        bannerImage !== PfpMain ? bannerImage : PfpMain
      );

      const image1Blob = await fetchAndConvertToBlob(
        image1 !== Pfp1 ? image1 : Pfp1
      );
      const image2Blob = await fetchAndConvertToBlob(
        image2 !== Pfp2 ? image2 : Pfp2
      );
      const image3Blob = await fetchAndConvertToBlob(
        image3 !== Pfp3 ? image3 : Pfp3
      );
      const image4Blob = await fetchAndConvertToBlob(
        image4 !== Pfp4 ? image4 : Pfp4
      );

      const images: Record<string, Blob | undefined> = {
        businessLogo: businessLogoBlob,
        image: mainImageBlob,
        businessBanner: businessBannerBlob,
        image1: image1Blob,
        image2: image2Blob,
        image3: image3Blob,
        image4: image4Blob,
      };

      const formDataToSend = new FormData();
      (Object.keys(payload) as Array<keyof typeof payload>).forEach((key) => {
        const value = payload[key];
        // FormData only accepts string, Blob, or File
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formDataToSend.append(key, item);
          });
        } else if (value !== undefined && value !== null) {
          formDataToSend.append(key, value as string | Blob);
        }
      });
      (Object.keys(images) as Array<keyof typeof images>).forEach((key) => {
        const value = images[key];
        if (value !== undefined) {
          formDataToSend.append(key, value);
        }
      });

      const url = (() => {
        if (type === "pending" && id && auth.userRole == 1) {
          return `${backendUrl}/api/pendings/admineditapproved/${id}`;
        }

        if (type === "pending" && id) {
          return `${backendUrl}/api/pendings/edit/${id}`;
        }

        if (auth.userRole == 1) {
          return id
            ? `${backendUrl}/api/places/${id}`
            : `${backendUrl}/api/places`;
        }

        return id
          ? `${backendUrl}/api/pendings/${id}`
          : `${backendUrl}/api/pendings`;
      })();

      const method = id ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
        headers: {
          Authorization: ` Bearer ${auth.token}`,
        },
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Something went wrong");
      }

      enqueueSnackbar(
        id ? "Update successful!" : "Listing created successfully!",
        { variant: "success" }
      );
      resetForm();
      console.log("url run:", url);
      if (
        url === `${backendUrl}/api/pendings` ||
        url === `${backendUrl}/api/pendings/${id}`
      ) {
        if (setCounter && counter !== undefined) {
          setCounter(counter + 1);
        }
        console.log("true");
      } else if (url === `${backendUrl}/api/pendings/admineditapproved/${id}`) {
        if (setCounter && counter !== undefined) {
          setCounter(counter - 1);
        }
      } else {
        console.log("false");
      }

      console.log("counter", counter);
      navigate(
        auth.userRole == 1 ? "/dashboard/listings" : "/dashboard/pendings"
      );
    } catch (error) {
      console.error("Error creating/updating listing:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();

  const [inputValues, setInputValues] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (item: FormDataItem, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("working");
    let inputValue = e.target.value;
    const maxLength = formData.find(
      (dataItem) => dataItem.name === item.name
    )?.maxLength;
    const minLength = item.minLength;

    let newError = "";

    if (typeof minLength === "number" && inputValue.length < minLength) {
      newError = `Please add a minimum of ${minLength} characters`;
    } else if (typeof maxLength === "number" && inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    setInputValues((prevState) => ({
      ...prevState,
      [item.name]: inputValue,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [item.name]: newError,
    }));

    // Check if any field has a value less than its respective minLength
    const anyFieldTooShort = formData.some((dataItem) => {
      const value =
        dataItem.name === item.name
          ? inputValue
          : (inputValues as Record<string, string>)[dataItem.name] || "";
        const minLength = typeof dataItem.minLength === "number" ? dataItem.minLength : 0;
        return value.length < minLength;
      });

      setIsAnyFieldTooShort(anyFieldTooShort);

    // Update specific state for each textarea
    const updateFieldState = (fieldName: string, value: string) => {
      switch (fieldName) {
        case "Banner Intro":
          setIntro(value);
          break;
        case "About us":
          setAbout(value);
          break;
        case "Why us":
          setWhyUs(value);
          break;
        case "Latest Projects Intro":
          setLatestProjectsIntro(value);
          break;
        case "Our Mission":
          setOurMission(value);
          break;
        case "Contact us Intro":
          setContactUsIntro(value);
          break;
        default:
          break;
      }
    };

    updateFieldState(item.name, inputValue);
  };

  useEffect(() => {
    if (imagePreviews?.length === 4 && mainImage) {
      setIsImageUploaded(true);
    } else {
      setIsImageUploaded(false);
    }
  }, [imagePreviews]);

  useEffect(() => {
    // Check if any select is not selected and update the flag
    if (!category || !region || !priceRange || accNtax.length === 0) {
      setIsAnySelectNotSelected(true);
    } else {
      setIsAnySelectNotSelected(false);
    }
  }, [category, region, priceRange, accNtax]);

  useEffect(() => {
    if (triggerResetForm) {
      resetForm();
      setTriggerResetForm(false);
    }
  }, [triggerResetForm]);

  const generateSlugForUpdate = (title: any) =>
    slugify(title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setIsTitleChanged(newTitle !== titleFromAPI);
    const newSlug = generateSlugForUpdate(newTitle);
    setSlug(newSlug);
  };
  useEffect(() => {
    setIsTitleChanged(title !== titleFromAPI);
  }, [title, titleFromAPI]);

  const confirmModalRef = useRef(null);

  const isDefaultLogoImage = logoImage === PfpMain;
  const isDefaultbannerImage = bannerImage === PfpMain;
  const isDefaultMainImage = mainImage === PfpMain;
  const isDefaultImage1 = image1 === Pfp1;
  const isDefaultImage2 = image2 === Pfp2;
  const isDefaultImage3 = image3 === Pfp3;
  const isDefaultImage4 = image4 === Pfp4;

  const resetImages = () => {
    setMainImage(PfpMain);
    setImage1(Pfp1);
    setImage2(Pfp3);
    setImage3(Pfp3);
    setImage4(Pfp4);

    setImageErrors((prev) => ({
      ...prev,
      image0: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      logo: "",
      banner: "",
    }));
  };

  const handleOtherServiceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setAccNtax((prev) => [
      ...prev.filter((service) => service !== "Others"),
      otherService,
    ]);
    setShowOtherServiceInput(false);
    setOtherService("");
    setRadioSelected(false);
  };
  const handleCheckboxCheck = (checked: boolean | ((prevState: boolean) => boolean)) => {
    if (checked) {
      setShowOtherServiceInput(true);
    } else {
      setShowOtherServiceInput(false);
      setOtherService("");
    }
    setRadioSelected(checked);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        pl: { xs: 0, sm: 1 },
        "@media (min-width:1050px)": { pl: 12 },
        pt: 3,
        pb: 10,
        ml: { md: "auto", sm: "auto", xs: "-45px" },
        maxWidth: "100%",
        overflowY: "scroll",
        height: "100vh",
      }}
    >
      <Grid
        container
        sx={{ display: "flex", pb: 2, pl: 0, mb: { xs: 5, sm: 0 } }}
      >
        <Grid item sx={{ mt: "auto" }} component="div" {...({} as any)}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#11161f",
              width: { md: "100px" },
              ml: { md: 2, sm: 2, xs: "-8px" },
              mt: { md: "auto", sm: "auto", xs: "-50px" },
            }}
          >
            Business Logo:
          </Typography>
        </Grid>
        <Box
          onClick={() => handleImageClick(logoFileInputRef as React.RefObject<HTMLInputElement>)}
          sx={{
            cursor: "pointer",
            borderRadius: "10px",
            position: "relative",
            ml: { md: 5, sm: 8, xs: 4 },
            mt: "15px",
          }}
        >
          {isDefaultLogoImage ? (
            <AddIcon
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                left: "57px",
                fontSize: "25px",
                borderRadius: "50%",
                bgcolor: "#5a8abf",
                color: "#fff",
              }}
            />
          ) : (
            <RemoveIcon
              sx={{
                position: "absolute",
                top: "-10px",
                right: "-5px",
                left: "57px",
                fontSize: "25px",
                borderRadius: "50%",
                bgcolor: "#f44336",
                color: "#fff",
              }}
            />
          )}
          <img
            src={logoImage}
            alt="PFP"
            height="80px"
            width="80px"
            style={{ borderRadius: "50%" }}
          />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(event) =>
              handleUploadFromDevice(event, setLogoImage, "logo")
            }
            ref={logoFileInputRef}
          />
          <Typography
            sx={{
              color: "gray",
              fontSize: "12px",
              mt: 1,
              ml: { xs: "-157px", sm: 1 },
              position: { xs: "absolute", sm: "relative" },
            }}
          >
            Image required of maximum size 130KB
          </Typography>{" "}
          <Typography
            sx={{
              color: "red",
              fontSize: "12px",
              mt: { xs: 3, sm: 1 },
              ml: { xs: "-157px", sm: 1 },
              position: { xs: "absolute", sm: "relative" },
              display: imageErrors.logo ? "block" : "none",
            }}
          >
            {imageErrors.logo}
          </Typography>{" "}
        </Box>
      </Grid>

      {formData.map((item, index) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          key={index}
          sx={{ py: 3 }}
          component="div"
          {...({} as any)}
        >
          <Grid container spacing={0}>
            <Grid
              item
              sm={4}
              xs={6}
              sx={{ display: "flex" }}
              component="div"
              {...({} as any)}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#11161f",
                  width: "100px",
                  ml: { md: 0, sm: 0, xs: "-20px" },
                }}
              >
                {item.name}:
              </Typography>
            </Grid>
            <Grid item sm={8} xs={6} component="div" {...({} as any)}>
              {item.type === "select" ? (
                <Select
                  multiple={
                    item.name === "Services" || item.name === "Category"
                  }
                  value={
                    item.name === "Category"
                      ? category || []
                      : item.name === "Region"
                      ? region || ""
                      : item.name === "Price Range"
                      ? priceRange || ""
                      : item.name === "Services"
                      ? accNtax || []
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    if (item.name === "Category") {
                      setCategory(Array.isArray(value) ? value : [value]);
                    } else if (item.name === "Region") {
                      setRegion(Array.isArray(value) ? value[0] : value);
                    } else if (item.name === "Services") {
                      setAccNtax(Array.isArray(value) ? value : [value]);
                    } else if (item.name === "Price Range") {
                      setPriceRange(Array.isArray(value) ? value[0] : value);
                    }
                  }}
                  displayEmpty
                  renderValue={(selected) => {
                    if (
                      selected.length === 0 &&
                      item.name !== "Services" &&
                      item.name !== "Category"
                    ) {
                      return <em>{item.placeholder}</em>;
                    }
                    if (
                      selected.length !== 0 &&
                      item.name !== "Services" &&
                      item.name !== "Category"
                    ) {
                      return selected;
                    }
                    if (
                      selected.length === 0 &&
                      (item.name === "Services" || item.name === "Category")
                    ) {
                      return <em>{item.placeholder}</em>;
                    }
                    if (
                      selected.length !== 0 &&
                      (item.name === "Services" || item.name === "Category")
                    ) {
                      return selected.join(", ");
                    }
                  }}
                  sx={{
                    width: { sm: "325px", xs: "180px" },
                    border: "1px solid #ccc",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    height: "45px",
                    borderRadius: "10px",
                    ml: "-40px",
                    color: "#11161f",
                    "&:focus": {
                      borderColor: "#11161f",
                    },
                  }}
                  inputProps={{
                    "aria-label": item.placeholder,
                    style: {
                      paddingLeft: "10px",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    {item.placeholder}
                  </MenuItem>
                  {item.options?.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              ) : item.name === "Banner Intro" ||
                item.name === "About us" ||
                item.name === "Why us" ||
                item.name === "Latest Projects Intro" ||
                item.name === "Our Mission" ||
                item.name === "Contact us Intro" ? (
                <>
                  <Box sx={{ width: { md: "72%", sm: "72%", xs: "100%" } }}>
                    <div style={{ position: "relative" }}>
                      <TextareaAutosize
                        maxRows={6}
                        minRows={3}
                        placeholder={item.placeholder}
                        value={
                          item.name === "Banner Intro"
                            ? intro
                            : item.name === "About us"
                            ? about
                            : item.name === "Why us"
                            ? whyUs
                            : item.name === "Latest Projects Intro"
                            ? latestProjectsIntro
                            : item.name === "Our Mission"
                            ? ourMission
                            : item.name === "Contact us Intro"
                            ? contactUsIntro
                            : ""
                        }
                        onChange={(e) => handleInputChange(item, e)}
                        style={{
                          width: "100%",
                          border: `1px solid ${
                            errors[item.name] ? "red" : "#ccc"
                          }`,
                          borderRadius: "10px",
                          padding: "8px",
                          paddingLeft: "15px",
                          paddingTop: "10px",
                          resize: "none",
                          color: "#11161f",
                          marginLeft: "-40px",
                          fontSize: "16px",
                          fontFamily: "Helvetica",
                          "&:focus": {
                            borderColor: errors[item.name] ? "red" : "#11161f",
                          },
                        }}
                      />

                      {errors[item.name] && inputValues[item.name] !== "" && (
                        <div
                          style={{
                            color: "red",
                            fontSize: "14px",
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            transform: "translateY(5px)",
                            marginLeft: "-35px",
                            marginTop: "22px",
                          }}
                        >
                          {errors[item.name]}
                        </div>
                      )}
                    </div>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "65%",
                    }}
                  >
                    {item.type !== "select" && (
                      <Typography
                        sx={{
                          fontSize: "12px",
                          ml: "-35px",
                        }}
                      >
                        Min: {item.minLength} - Max: {item.maxLength}
                      </Typography>
                    )}
                    {item.type !== "select" && inputValues[item.name] && (
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color:
                            inputValues[item.name].length > item.maxLength
                              ? "red"
                              : "inherit",
                        }}
                      >
                        {inputValues[item.name].length}/{item.maxLength}
                      </Typography>
                    )}
                  </Box>
                </>
              ) : (
                <>
                  <InputBase
                    placeholder={item.placeholder}
                    inputProps={{ maxLength: item.maxLength }}
                    value={
                      item.name === "Banner Title"
                        ? title
                        : item.name === "City"
                        ? city
                        : item.name === "Area"
                        ? area
                        : item.name === "Phone"
                        ? phone
                        : item.name === "Street"
                        ? street
                        : item.name === "Website"
                        ? website
                        : item.name === "Map Embed (src)"
                        ? mapUrl
                        : ""
                    }
                    onChange={(e) => {
                      const { value } = e.target;
                      if (item.name === "Banner Title") {
                        setTitle(value);
                        handleTitleChange(e);
                      } else if (item.name === "City") setCity(value);
                      else if (item.name === "Area") setArea(value);
                      else if (item.name === "Phone") {
                        const re = /^[0-9]+$/;
                        if (value === "" || re.test(value)) {
                          setPhone(value);
                        }
                      } else if (item.name === "Street") setStreet(value);
                      else if (item.name === "Website") setWebsite(value);
                      else if (item.name === "Map Embed (src)") {
                        const isValidGoogleMapUrl = value.startsWith(
                          "https://www.google.com/maps/embed?"
                        );
                        setMapUrl(isValidGoogleMapUrl ? value : "");
                      }
                    }}
                    sx={{
                      width: { sm: "325px", xs: "180px" },
                      border: "1px solid #ccc",
                      paddingTop: "8px",
                      pl: "15px",
                      pr: "15px",
                      paddingBottom: "8px",
                      height: "45px",
                      borderRadius: "10px",
                      ml: "-40px",
                      color: "#11161f",
                      "&:focus": {
                        borderColor: "#11161f",
                      },
                    }}
                  />
                  {item.name === "Map Embed (src)" && (
                    <Tooltip
                      title={
                        <Typography>
                          Enter the embedded map URL from Google Maps. To obtain
                          it:
                          <ol>
                            <li>Go to Google Maps.</li>
                            <li>Find your location or address.</li>
                            <li>
                              Click on the menu icon (three horizontal lines) on
                              the top left.
                            </li>
                            <li>Select "Share or embed map".</li>
                            <li>
                              Choose the "Embed a map" tab, customize the map if
                              needed, and copy the HTML embed code.
                            </li>
                            <li>
                              For Example:
                              https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d415855.9404712863!2d-97.47919744999999!3d35.48264794999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ad8a547ef8d281%3A0x33a21274d14f3a9d!2sOklahoma%20City%2C%20OK%2C%20USA!5e0!3m2!1sen!2s!4v1721667971291!5m2!1sen!2s
                            </li>
                          </ol>
                        </Typography>
                      }
                      placement="bottom-start"
                    >
                      <HelpOutlineIcon
                        sx={{
                          ml: "0.2rem",
                          cursor: "pointer",
                          color: "gray",
                          fontSize: "18px",
                        }}
                      />
                    </Tooltip>
                  )}
                  <Typography sx={{ color: "red", ml: -4 }}>
                    {item.name === "Phone" &&
                    phone.length < 10 &&
                    phone.length !== 0
                      ? "Phone no must be at least 10 characters long."
                      : null}
                  </Typography>
                  {item.name === "Website" && (
                    <Typography
                      sx={{ color: "orange", fontSize: "12px", ml: -4, mt: 1 }}
                    >
                      * Do not change if you don't have a website.
                    </Typography>
                  )}
                </>
              )}
              {item.name === "Services" && (
                <Box sx={{ ml: "-40px" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={radioSelected}
                        onChange={(e) => handleCheckboxCheck(e.target.checked)}
                        sx={{
                          "&.Mui-checked": {
                            color: "#1c9ac0",
                          },
                        }}
                      />
                    }
                    label="Add Other Services"
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                      },
                    }}
                  />
                </Box>
              )}

              {showOtherServiceInput && item.name === "Services" && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "77%",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    ml: "-40px",
                    height: "45px",
                  }}
                >
                  <InputBase
                    placeholder="Specify Other Service"
                    value={otherService}
                    onChange={(e) => setOtherService(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && otherService.trim() !== "") {
                        setAccNtax((prev) => [
                          ...prev.filter((service) => service !== "Others"),
                          otherService,
                        ]);
                        setOtherService("");
                        setRadioSelected(false);
                        setShowOtherServiceInput(false);
                      }
                    }}
                    sx={{
                      flex: 1,
                      border: "none",
                      paddingLeft: "15px",
                      paddingRight: "10px",
                      height: "100%",
                      borderRadius: "10px",
                      color: "#11161f",
                      "&:focus": {
                        borderColor: "#11161f",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOtherServiceKeyDown}
                    sx={{
                      backgroundColor: "#1c9ac0",
                      height: "100%",
                      borderRadius: "0 10px 10px 0",
                      ml: "4px",
                      paddingX: "16px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#1c9ac0",
                      },
                    }}
                    disabled={otherService === "" ? true : false}
                  >
                    Add
                  </Button>
                </Box>
              )}
              {item.name === "Services" && (
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexWrap: "wrap",
                    ml: "-40px",
                    width: "90%",
                  }}
                >
                  {accNtax
                    .filter((service) => service !== "Others")
                    .map((service, index) => (
                      <Chip
                        key={index}
                        label={service}
                        onDelete={() => {
                          const updatedServices = accNtax.filter(
                            (s) => s !== service
                          );
                          setAccNtax(updatedServices);

                          if (!updatedServices.includes("Others")) {
                            setShowOtherServiceInput(false);
                            setOtherService("");
                          }
                        }}
                        sx={{ margin: "2px" }}
                      />
                    ))}
                </Box>
              )}

              {formErrors[item.name.toLowerCase()] && (
                <Typography
                  color="error"
                  sx={{ fontSize: "12px", ml: "-40px" }}
                >
                  {formErrors[item.name.toLowerCase()]}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      ))}

      <Grid item xs={12} sx={{ py: 3 }} component="div" {...({} as any)}>
        <Grid container alignItems="center" spacing={0}>
          <Grid
            item
            xs={1.5}
            sx={{ display: "flex" }}
            component="div"
            {...({} as any)}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#11161f",
                width: "100px",
                ml: { md: 0, sm: 0, xs: "-20px" },
              }}
            >
              Description:
            </Typography>
          </Grid>
          <Grid
            item
            md={9.5}
            sm={11}
            xs={12}
            sx={{
              borderRadius: "10px",
              pt: { md: "0px", sm: "20px", xs: "20px" },
              pl: { md: "0px", sm: "-60px", xs: "-60px" },
              pr: { md: "0px", sm: "10px", xs: "10px" },
              ml: { md: 0, sm: 0, xs: "-20px" },
              minWidth: { xs: "295px" },
            }}
            component="div"
            {...({} as any)}
          >
            <ReactQuill
              theme="snow"
              value={desc}
              onChange={setDesc}
              placeholder="Description"
              className="custom-quill"
              style={{ width: "100%", height: "100px", borderRadius: "10px" }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ display: "flex", pb: 2, pl: 0, pt: 5 }}>
        <Grid
          item
          xs={12}
          md={1.2}
          sx={{ display: "flex", alignItems: "center" }}
          component="div"
          {...({} as any)}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#11161f",
              marginY: "10px",
              width: { md: "100px" },
              ml: { md: 2, sm: 2, xs: "-8px" },
            }}
          >
            Banner Image:
          </Typography>
        </Grid>
        <Grid item xs={12} md={5} component="div" {...({} as any)}>
          <Box
            onClick={() => handleImageClick(bannerFileInputRef)}
            sx={{
              cursor: "pointer",
              borderRadius: "10px",
              position: "relative",
              ml: { md: 5, sm: 2, xs: 2 },
              mr: { md: 0, sm: 8, xs: 0 },
              mt: { md: "15px", xs: "12px" },
            }}
          >
            {isDefaultbannerImage ? (
              <AddIcon
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  fontSize: "25px",
                  borderRadius: "50%",
                  bgcolor: "#5a8abf",
                  color: "#fff",
                }}
              />
            ) : (
              <RemoveIcon
                sx={{
                  position: "absolute",
                  top: "-10px",
                  right: "-5px",
                  fontSize: "25px",
                  borderRadius: "50%",
                  bgcolor: "#f44336",
                  color: "#fff",
                }}
              />
            )}

            <img
              src={bannerImage}
              alt="Banner"
              height="350px"
              width="100%"
              objectFit="cover"
              style={{ borderRadius: "10px" }}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(event) =>
                handleUploadFromDevice(event, setBannerImage, "banner")
              }
              ref={bannerFileInputRef}
            />
          </Box>
          <Typography
            sx={{
              color: "gray",
              fontSize: "12px",
              ml: 5,
              mt: 4,
            }}
          >
            Image required of maximum size 130KB
          </Typography>
          <Typography
            sx={{
              color: "red",
              fontSize: "12px",
              ml: 5,
              mt: 1,
            }}
          >
            {imageErrors.banner}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          pb: 2,
          pl: 0,
          pt: 5,
        }}
      >
        <Grid
          item
          xs={12}
          md={1.2}
          sx={{ display: "flex", alignItems: "center", position: "relative" }}
          component="div"
          {...({} as any)}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#11161f",
              position: { xs: "relative", md: "absolute" },
              top: { xs: "0px", md: "18px" },
              width: { md: "100px", sm: "220px", xs: "220px" },
              pl: 0.6,
              pt: { md: 0, sm: "40px", xs: "30px" },
              ml: { md: "auto", sm: "0px", xs: "-20px" },
            }}
          >
            Feature Images:
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={5}
          sx={{ mt: { xs: "5.5rem", lg: 0 } }}
          component="div"
          {...({} as any)}
        >
          <Box
            onClick={() => handleImageClick(mainFileInputRef)}
            sx={{
              cursor: "pointer",
              borderRadius: "10px",
              position: "relative",
              ml: { md: 5, sm: 2, xs: 2 },
              mr: { md: 0, sm: 8, xs: 0 },
              mt: { md: "15px", xs: "12px" },
            }}
          >
            {isDefaultMainImage ? (
              <AddIcon
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  fontSize: "25px",
                  borderRadius: "50%",
                  bgcolor: "#5a8abf",
                  color: "#fff",
                }}
              />
            ) : (
              <RemoveIcon
                sx={{
                  position: "absolute",
                  top: "-10px",
                  right: "-5px",
                  fontSize: "25px",
                  borderRadius: "50%",
                  bgcolor: "#f44336",
                  color: "#fff",
                }}
              />
            )}
            <img
              src={mainImage}
              alt="Banner"
              height="350px"
              width="100%"
              objectFit="cover"
              style={{ borderRadius: "10px" }}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              multiple
              onChange={handleMultipleImageUpload}
              ref={mainFileInputRef}
            />
            <Typography
              sx={{
                color: "red",
                fontSize: "12px",
                mt: 1,
                ml: { xs: "0", sm: 1 },
                position: { xs: "absolute", sm: "relative" },
                display: imageErrors.image0 ? "block" : "none",
              }}
            >
              {imageErrors.image0}
            </Typography>{" "}
          </Box>
          {!isDefaultMainImage && (
            <Chip
              label="Clear Images"
              onDelete={resetImages}
              sx={{
                top: "32px",
                left: "36px",
                display: { xs: "none", md: "inline-flex" },
              }}
            />
          )}
        </Grid>
        {hasUploadedImages && (
          <Grid
            item
            xs={12}
            md={4.9}
            mt={2}
            ml={2}
            component="div"
            {...({} as any)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} component="div" {...({} as any)}>
                <Box
                  onClick={() => handleImageClick(image1Ref)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    position: "relative",
                    ml: { md: 2, sm: 2, xs: 0 },
                    mr: { md: 0, sm: 8, xs: 0 },
                    mt: { md: "15px", xs: "12px" },
                  }}
                >
                  {isDefaultImage1 ? (
                    <AddIcon
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        fontSize: "25px",
                        borderRadius: "50%",
                        bgcolor: "#5a8abf",
                        color: "#fff",
                      }}
                    />
                  ) : (
                    <RemoveIcon
                      sx={{
                        position: "absolute",
                        top: "-10px",
                        right: "-5px",
                        fontSize: "25px",
                        borderRadius: "50%",
                        bgcolor: "#f44336",
                        color: "#fff",
                      }}
                    />
                  )}
                  <img
                    src={image1}
                    alt="Banner"
                    height="250px"
                    width="100%"
                    objectFit="cover"
                    style={{ borderRadius: "10px" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(event) =>
                      handleUploadFromDevice(event, setImage1, "image1")
                    }
                    ref={image1Ref}
                  />
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "12px",
                      mt: 1,
                      ml: { xs: "0", sm: 1 },
                      position: { xs: "absolute", sm: "relative" },
                      display: imageErrors.image1 ? "block" : "none",
                    }}
                  >
                    {imageErrors.image1}
                  </Typography>{" "}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} component="div" {...({} as any)}>
                <Box
                  onClick={() => handleImageClick(image2Ref)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    position: "relative",
                    ml: { md: 2, sm: 2, xs: 0 },
                    mr: { md: 0, sm: 8, xs: 0 },
                    mt: { md: "15px", xs: "12px" },
                  }}
                >
                  {isDefaultImage2 ? (
                    <AddIcon
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        fontSize: "25px",
                        borderRadius: "50%",
                        bgcolor: "#5a8abf",
                        color: "#fff",
                      }}
                    />
                  ) : (
                    <RemoveIcon
                      sx={{
                        position: "absolute",
                        top: "-10px",
                        right: "-5px",
                        fontSize: "25px",
                        borderRadius: "50%",
                        bgcolor: "#f44336",
                        color: "#fff",
                      }}
                    />
                  )}
                  <img
                    src={image2}
                    alt="Banner"
                    height="250px"
                    width="100%"
                    objectFit="cover"
                    style={{ borderRadius: "10px" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(event) =>
                      handleUploadFromDevice(event, setImage2, "image2")
                    }
                    ref={image2Ref}
                  />
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "12px",
                      mt: 1,
                      ml: { xs: "0", sm: 1 },
                      position: { xs: "absolute", sm: "relative" },
                      display: imageErrors.image2 ? "block" : "none",
                    }}
                  >
                    {imageErrors.image2}
                  </Typography>{" "}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} component="div" {...({} as any)}>
                <Box
                  onClick={() => handleImageClick(image3Ref)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    position: "relative",
                    ml: { md: 2, sm: 2, xs: 0 },
                    mr: { md: 0, sm: 8, xs: 0 },
                    mt: { md: "15px", xs: "12px" },
                  }}
                >
                  {isDefaultImage3 ? (
                    <AddIcon
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        fontSize: "25px",
                        borderRadius: "50%",
                        bgcolor: "#5a8abf",
                        color: "#fff",
                      }}
                    />
                  ) : (
                    <RemoveIcon
                      sx={{
                        position: "absolute",
                        top: "-10px",
                        right: "-5px",
                        fontSize: "25px",
                        borderRadius: "50%",
                        bgcolor: "#f44336",
                        color: "#fff",
                      }}
                    />
                  )}
                  <img
                    src={image3}
                    alt="Banner"
                    height="250px"
                    width="100%"
                    objectFit="cover"
                    style={{ borderRadius: "10px" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(event) =>
                      handleUploadFromDevice(event, setImage3, "image3")
                    }
                    ref={image3Ref}
                  />
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "12px",
                      mt: 1,
                      ml: { xs: "0", sm: 1 },
                      position: { xs: "absolute", sm: "relative" },
                      display: imageErrors.image3 ? "block" : "none",
                    }}
                  >
                    {imageErrors.image3}
                  </Typography>{" "}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} component="div" {...({} as any)}>
                <Box
                  onClick={() => handleImageClick(image4Ref)}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    position: "relative",
                    ml: { md: 2, sm: 2, xs: 0 },
                    mr: { md: 0, sm: 8, xs: 0 },
                    mt: { md: "15px", xs: "12px" },
                  }}
                >
                  {isDefaultImage4 ? (
                    <AddIcon
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        fontSize: "25px",
                        borderRadius: "50%",
                        bgcolor: "#5a8abf",
                        color: "#fff",
                      }}
                    />
                  ) : (
                    <RemoveIcon
                      sx={{
                        position: "absolute",
                        top: "-10px",
                        right: "-5px",
                        fontSize: "25px",
                        borderRadius: "50%",
                        bgcolor: "#f44336",
                        color: "#fff",
                      }}
                    />
                  )}
                  <img
                    src={image4}
                    alt="Banner"
                    height="250px"
                    width="100%"
                    objectFit="cover"
                    style={{ borderRadius: "10px" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(event) =>
                      handleUploadFromDevice(event, setImage4, "image4")
                    }
                    ref={image4Ref}
                  />
                  <Typography
                    sx={{
                      color: "red",
                      fontSize: "12px",
                      mt: 1,
                      ml: { xs: "0", sm: 1 },
                      position: { xs: "absolute", sm: "relative" },
                      display: imageErrors.image4 ? "block" : "none",
                    }}
                  >
                    {imageErrors.image4}
                  </Typography>{" "}
                </Box>
              </Grid>
            </Grid>
            {!isDefaultMainImage && (
              <Chip
                label="Clear Images"
                onDelete={resetImages}
                sx={{
                  top: "32px",
                  left: "36px",
                  display: { xs: "inline-flex", md: "none" },
                }}
              />
            )}
          </Grid>
        )}
      </Grid>
      <Grid item md={8} sm={11} xs={11} component="div" {...({} as any)}>
        <Typography
          sx={{
            ml: { sm: 22, xs: 0 },
            fontSize: "12px",
            color: "gray",
            mt: 1,
            display: { sm: "block", xs: "block" },
          }}
        >
          Minimum 5 Images required (JPG/PNG/JFIF only) of each maximum size
          130KB
        </Typography>
      </Grid>

      <Grid container sx={{ mt: 5, mr: 12, justifyContent: "right" }}>
        {responseMessage && (
          <Grow in={true} timeout={500}>
            <Typography
              variant="body1"
              sx={{
                color: responseMessage.includes("Error") ? "green" : "red",
                marginBottom: 2,
                transition: "color 0.3s ease-out",
              }}
            >
              {responseMessage}
            </Typography>
          </Grow>
        )}
      </Grid>
      <Grid
        container
        sx={{ pt: 0, mr: { md: 12, sm: 8 }, justifyContent: "right" }}
      >
        <Button
          onClick={() => {
            navigate("/dashboard/createlisting");
            resetForm();
          }}
          sx={{
            color: "#fff",
            bgcolor: "#11161f",
            fontSize: "14px",
            letterSpacing: "1px",
            p: { md: "15px", sm: "15px", xs: "10px" },
            borderRadius: "10px",
            "&:hover": {
              color: "#1c9ac0",
              bgcolor: "#11161f",
            },
            fontWeight: "600",
            mb: 5,
            mt: 2,
            mr: { md: 2, xs: 3 },
          }}
        >
          Cancel
        </Button>

        {loading ? (
          <CircularProgress
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="outlined"
            sx={{
              cursor: "not-allowed",
              color: "#fff !important",
              bgcolor: "#11161f",
              fontSize: "14px",
              letterSpacing: "1px",
              p: "15px",
              borderRadius: "10px",
              "&:hover": { color: "#1c9ac0", bgcolor: "#11161f" },
              fontWeight: "600",
            }}
          >
            {id ? "Updating Listings" : "Creating Listings"}
          </CircularProgress>
        ) : (
          <>
            {isTitleChanged && titleFromAPI && id ? (
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    color: "#fff",
                    bgcolor: "#11161f",
                    fontSize: "14px",
                    letterSpacing: "1px",
                    p: { md: "15px", sm: "15px", xs: "10px" },
                    borderRadius: "10px",
                    "&:hover": { color: "#1c9ac0", bgcolor: "#11161f" },
                    fontWeight: "600",
                    mb: 5,
                    mt: 2,
                    mr: { md: 0, sm: 0, xs: "-25px" },
                    opacity: !areAllFieldsFilled() ? 0.3 : 1,
                    "&.Mui-disabled": {
                      color: "#fff",
                    },
                  }}
                  onClick={() => confirmModalRef.current.openModal()}
                >
                  Updating Listings
                </Button>
              </Box>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!areAllFieldsFilled()}
                sx={{
                  color: "#fff",
                  bgcolor: "#11161f",
                  fontSize: "14px",
                  letterSpacing: "1px",
                  p: { md: "15px", sm: "15px", xs: "10px" },
                  borderRadius: "10px",
                  "&:hover": { color: "#1c9ac0", bgcolor: "#11161f" },
                  fontWeight: "600",
                  mb: 5,
                  mt: 2,
                  mr: { md: 0, sm: 0, xs: "-25px" },
                  opacity: !areAllFieldsFilled() ? 0.3 : 1,
                  "&.Mui-disabled": {
                    color: "#fff",
                  },
                }}
              >
                {id ? "Update Listings" : "Create Listings"}
              </Button>
            )}
            <ConfirmModal
              ref={confirmModalRef}
              slug={slug}
              handleSubmit={handleSubmit}
              confirmLabel="Update"
              cancelLabel="Cancel"
            />
          </>
        )}
      </Grid>

      <style>
        {`
          .custom-quill .ql-toolbar {
            border-radius: 10px 10px 0 0;
            border: 1px solid #ccc;
            border-bottom: none;
          }

          .custom-quill .ql-container {
            border-radius: 0 0 10px 10px;
            border: 1px solid #ccc;
          }

          .custom-quill .ql-editor {
            border-radius: 0 0 10px 10px;
          }
        `}
      </style>
    </Grid>
  );
};

export default function EnhancedCreatelisting({
  triggerResetForm,
  setTriggerResetForm,
}: {
  triggerResetForm?: any;
  setTriggerResetForm?: any;
}) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <CreateListing
        triggerResetForm={triggerResetForm}
        setTriggerResetForm={setTriggerResetForm}
      />
    </SnackbarProvider>
  );
}
