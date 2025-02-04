"use client";
import { ToastError, ToastSuccess } from "@/components/toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { createClient } from "@/utils/supabase/client";
import {
  ArrowRight,
  BatteryLow,
  Eye,
  FilePenLine,
  Fingerprint,
  Info,
  KeyRound,
  Loader,
  Mail,
  Plus,
  SignalMedium,
  Type,
  UserPlus,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { BsFiletypeCsv } from "react-icons/bs";
import Papa from "papaparse";
import { saveAs } from "file-saver";

const NewsletterForm = () => {
  const supabase = createClient();
  const [preview, setPreview] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [newsletterConfig, setNewsletterConfig] = useState({
    mailchimp_api_key: "",
    mailchimp_audience_id: "",
    newsletter_title: "",
    newsletter_call_to_action: "",
  });

  const fetchProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("newsletter_config")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error newsletter config:", error.message);
        } else {
          setNewsletterConfig(data.newsletter_config);
        }
      }
    } catch (error) {
      console.error("Error retrieving config:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("newsletter_subscribers")
          .select("*")
          .eq("user_id", user.id)
          .order("timestamp", { ascending: false });

        if (error) {
          console.error("Error fetching subscribers:", error.message);
        } else {
          setSubscribers(data);
        }
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchSubscribers();
  }, []);

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: any[]) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const updateFieldInSupabase = async ({ value }: { value: any }) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("profiles")
        .update({ newsletter_config: value })
        .eq("id", user?.id);

      if (error) {
        ToastError({
          message: "An unexpected error occurred.",
        });
      }

      ToastSuccess({ message: "Updated successfully." });
    } catch (error) {
      ToastError({ message: "An unexpected error occurred." });
    }
  };

  const debouncedUpdateField = useCallback(
    debounce(updateFieldInSupabase, 1000),
    []
  );

  const subscribeUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      ToastError({ message: "Invalid email." });
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .insert({
        user_id: user?.id,
        email: email,
        status: true,
      });

    // const res = await fetch("/api/mailchimp-subscribe", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });

    // const data = await res.json();
    ToastSuccess({ message: "Added Subscriber." });
    setEmail("");
  };

  const handleFieldChange = ({
    field,
    value,
  }: {
    field: string;
    value: string;
  }) => {
    setNewsletterConfig((prev) => {
      const updatedConfig = { ...prev, [field]: value };
      debouncedUpdateField({ value: updatedConfig });

      return updatedConfig;
    });
  };

  const handleGenerateCSV = ({
    e,
    subscribers,
  }: {
    e: any;
    subscribers: any;
  }) => {
    interface subscriber {
      email: string;
      status: boolean;
      timestamp: string;
    }

    e.preventDefault();

    const csvData = subscribers.map((subscriber: subscriber) => ({
      Email: subscriber.email,
      Status: subscriber.status,
      SubscribedOn: new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }).format(new Date(subscriber.timestamp)),
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    setTimeout(async () => {
      saveAs(blob, "newsletterSubscribers.csv");
    }, 2000);
  };

  return (
    <>
      <div
        onClick={() => setPreview(true)}
        className="lg:hidden font-bold py-1 px-2 inline-flex items-center justify-center bg-secondary-bg rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-secondary-strongerborder w-[120px] bottom-6 fixed left-1/2 translate-x-[-50%] z-[48]"
      >
        <Eye strokeWidth={1} className="text-primarytext text-lg mr-1" />
        <p className="text-primarytext font-semibold text-base">Preview</p>
      </div>
      <div className="flex gap-2 h-auto lg:h-[calc(100vh-100px)] relative">
        <div className="lg:w-[55%] w-full lg:overflow-y-auto">
          <div className="flex flex-col items-start justify-center gap-3 w-full pb-3 px-3">
            <div className="p-2 flex items-center justify-between w-full">
              <h1 className="text-lg lg:text-xl  text-primarytext font-semibold">
                Manage your newsletter audience
              </h1>
              <div
                onClick={(e) => {
                  handleGenerateCSV({ e: e, subscribers: subscribers });
                }}
                className="flex  items-center justify-center cursor-pointer"
              >
                <p className="py-1 px-2 flex text-primarytext items-center justify-center gap-1 text-xs bg-secondary-bg hover:bg-secondary-selection hover:border-secondary-strongerborder transition-all duration-200 ease-out rounded-md border border-secondary-border">
                  Export as CSV <BsFiletypeCsv size={15} />
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 w-full px-4 py-2">
            <div className="flex flex-col items-center justify-center gap-3 w-full px-4 py-4 border border-secondary-strongerborder rounded-md border-dashed">
              <div className="flex items-center justify-start gap-2 mb-2 w-full">
                <p className="text-primary-text/90 font-medium text-base lg:text-lg">
                  Mailchimp Setup
                </p>
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src="/mailchimp.png"
                />
              </div>
              <div className="w-full">
                <label className="text-sm font-medium text-primary-text/80 px-1 mb-0.5 flex items-center justify-start">
                  API key
                  <HoverCard openDelay={250}>
                    <HoverCardTrigger className="text-sm font-medium text-primary-text cursor-pointer">
                      <Info strokeWidth={1} size={16} className="ml-1" />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-primary-bg border border-secondary-border rounded-md z-50">
                      <div className="flex flex-col p-2">
                        <p className="text-sm font-semibold">
                          Why do I need an API key?
                        </p>
                        <p className="text-xs text-primary-text/70 font-normal">
                          The API key is needed to connect your Mailchimp and
                          add the contact. Follow these steps to get your API
                          key:
                        </p>
                        <ol className="text-xs text-primary-text/70 mt-2 list-decimal list-inside font-normal">
                          <li>
                            Log in to{" "}
                            <a
                              href="https://mailchimp.com/"
                              className="text-accent-text underline font-medium"
                            >
                              Mailchimp
                            </a>
                          </li>
                          <li>
                            Go to{" "}
                            <b className="text-primary-text/80">
                              Account & Billing
                            </b>{" "}
                            → <b className="text-primary-text/80">Extras</b> →{" "}
                            <b className="text-primary-text/80">API keys</b>
                          </li>
                          <li>
                            Click{" "}
                            <b className="text-primary-text/80">Create A Key</b>{" "}
                            and copy it
                          </li>
                          <li>Paste the key here</li>
                        </ol>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </label>
                <div className="relative">
                  <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                    <KeyRound
                      strokeWidth={1}
                      size={20}
                      className="text-primary-text/80 text-xl"
                    />
                  </span>
                  <input
                    type="text"
                    name="mailchimp_api_key"
                    value={newsletterConfig.mailchimp_api_key}
                    placeholder="mailchimp API key"
                    onChange={(e) => {
                      handleFieldChange({
                        field: "mailchimp_api_key",
                        value: e.target.value,
                      });
                    }}
                    className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-10 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                  />
                </div>
              </div>
              <div className="w-full mb-2">
                <label className="text-sm font-medium text-primary-text/80 px-1 mb-0.5 flex items-center justify-start">
                  Audience id
                  <HoverCard openDelay={250}>
                    <HoverCardTrigger className="text-sm font-medium text-primary-text cursor-pointer">
                      <Info strokeWidth={1} size={16} className="ml-1" />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-primary-bg border border-secondary-border rounded-md z-50">
                      <div className="flex flex-col p-2">
                        <p className="text-sm font-semibold">
                          Why do I need an Audience ID?
                        </p>
                        <p className="text-xs text-primary-text/70 font-normal">
                          The Audience ID (List ID) is required to send contacts
                          to the correct Mailchimp list. Follow these steps to
                          find your Audience ID:
                        </p>
                        <ol className="text-xs text-primary-text/70 mt-2 list-decimal list-inside font-normal">
                          <li>
                            Log in to{" "}
                            <a
                              href="https://mailchimp.com/"
                              className="text-accent-text underline font-medium"
                            >
                              Mailchimp
                            </a>
                          </li>
                          <li>
                            Go to{" "}
                            <b className="text-primary-text/80">Audience</b> →{" "}
                            <b className="text-primary-text/80">
                              Audience dashboard
                            </b>
                          </li>
                          <li>
                            Click{" "}
                            <b className="text-primary-text/80">Settings</b>
                          </li>
                          <li>
                            Scroll down to{" "}
                            <b className="text-primary-text/80">Audience ID</b>,
                            copy it, and paste it here
                          </li>
                        </ol>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </label>
                <div className="relative">
                  <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                    <Fingerprint
                      strokeWidth={1}
                      size={20}
                      className="text-primary-text/80 text-xl"
                    />
                  </span>
                  <input
                    type="text"
                    name="mailchimp_audience_id"
                    value={newsletterConfig.mailchimp_audience_id}
                    placeholder="mailchimp audience id"
                    onChange={(e) => {
                      handleFieldChange({
                        field: "mailchimp_audience_id",
                        value: e.target.value,
                      });
                    }}
                    className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-10 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 w-full px-4 py-3 border border-secondary-strongerborder rounded-md border-dashed">
              <div className="flex items-center justify-start gap-2 mb-2 w-full">
                <p className="text-primary-text/80 font-medium text-base lg:text-lg">
                  Add Subscriber
                </p>
                <UserPlus size={20} />
              </div>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-3 w-full">
                <div className="relative w-full lg:w-4/5">
                  <span className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center">
                    <Mail
                      strokeWidth={1}
                      size={20}
                      className="text-primary-text/80 text-xl"
                    />
                  </span>
                  <input
                    type="email"
                    name="mailchimp_manual_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter email to add"
                    className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-10 text-sm bg-secondary-bg border focus:outline-none rounded-md"
                  />
                </div>
                <button
                  disabled={email === ""}
                  data-acive={email !== ""}
                  onClick={subscribeUser}
                  className="w-full lg:w-1/5 py-1.5 font-normal rounded-md disabled:bg-accent-bg/60 disabled:border-accent-border/60 disabled:text-primary-text/60 bg-accent-bg text-primary-text data-[active=true]:hover:bg-accent-selection border border-accent-border data-[active=true]:hover:border-accent-strongerborder transition-all ease-out duration-200 disabled:cursor-not-allowed"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <div className="mb-4 flex flex-col items-center justify-center gap-3 w-full px-4 py-3 border border-secondary-strongerborder rounded-md border-dashed">
              <div className="flex items-center justify-start gap-2 mb-2 w-full">
                <p className="text-primary-text/80 font-medium text-base lg:text-lg">
                  Customize input
                </p>
                <FilePenLine size={20} />
              </div>
              <div className="flex flex-col items-center justify-center gap-3 w-full">
                <div className="w-full">
                  <label className="block text-sm font-medium text-primary-text/80 px-1 mb-0.5">
                    Title
                  </label>
                  <div className="relative">
                    <span className="absolute top-[55%] -translate-y-1/2 left-3 flex items-center">
                      <Type
                        strokeWidth={1}
                        size={20}
                        className="text-primary-text/80 text-xl"
                      />
                    </span>
                    <input
                      type="text"
                      name="newsletter_title"
                      value={newsletterConfig.newsletter_title}
                      onChange={(e) => {
                        handleFieldChange({
                          field: "newsletter_title",
                          value: e.target.value,
                        });
                      }}
                      placeholder="text to diplay for profile link"
                      className="border-secondary-border focus:border-secondary-strongerborder w-full py-2 pl-10 text-sm bg-secondary-bg border focus:outline-none rounded-md mt-1"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-primary-text/80 px-1 mb-2">
                    Call to action
                  </label>
                  <div className="flex flex-wrap items-center justify-start gap-3">
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full px-2"
                        htmlFor="on"
                        data-ripple-dark="true"
                      >
                        <input
                          id="addDatabase"
                          name="newsletter_call_to_action"
                          type="radio"
                          className="before:content[''] peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-secondary-border checked:border-accent-strongerborder transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-secondary-bg before:opacity-0 before:transition-opacity hover:before:opacity-10"
                          checked={
                            newsletterConfig.newsletter_call_to_action ===
                            "add_to_database"
                          }
                          onChange={() => {
                            handleFieldChange({
                              field: "newsletter_call_to_action",
                              value: "add_to_database",
                            });
                          }}
                        />
                        <span className="absolute bg-accent-text w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                      </label>
                      <label
                        className="text-primary-text cursor-pointer text-sm"
                        htmlFor="on"
                      >
                        Add to database
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full px-2"
                        htmlFor="on"
                        data-ripple-dark="true"
                      >
                        <input
                          id="addMailchimp"
                          name="newsletter_call_to_action"
                          type="radio"
                          className="before:content[''] peer h-5 w-5 disabled:cursor-not-allowed cursor-pointer appearance-none rounded-full border border-secondary-border checked:border-accent-strongerborder transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-secondary-bg before:opacity-0 before:transition-opacity hover:before:opacity-10"
                          checked={
                            newsletterConfig.newsletter_call_to_action ===
                            "add_to_mailchimp"
                          }
                          disabled={
                            newsletterConfig.mailchimp_api_key === "" ||
                            newsletterConfig.mailchimp_audience_id === ""
                          }
                          onChange={() => {
                            handleFieldChange({
                              field: "newsletter_call_to_action",
                              value: "add_to_mailchimp",
                            });
                          }}
                        />
                        <span className="absolute bg-accent-text w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                      </label>
                      <label
                        data-active={
                          newsletterConfig.mailchimp_api_key !== "" &&
                          newsletterConfig.mailchimp_audience_id !== ""
                        }
                        onClick={(e) => {
                          const isActive =
                            e.currentTarget.dataset.active === "true";

                          if (!isActive) {
                            ToastError({
                              message: "Add mailchimp info first.",
                            });
                          }
                        }}
                        className="data-[active=true]:text-primary-text text-primary-text/60 cursor-pointer text-sm"
                        htmlFor="on"
                      >
                        Add to mailchimp
                      </label>
                    </div>
                    <div className="inline-flex items-center">
                      <label
                        className="relative flex cursor-pointer items-center rounded-full px-2"
                        htmlFor="on"
                        data-ripple-dark="true"
                      >
                        <input
                          id="addDatabaseMailchimp"
                          name="newsletter_call_to_action"
                          type="radio"
                          className="before:content[''] peer h-5 w-5 disabled:cursor-not-allowed cursor-pointer appearance-none rounded-full border border-secondary-border checked:border-accent-strongerborder transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-secondary-bg before:opacity-0 before:transition-opacity hover:before:opacity-10"
                          checked={
                            newsletterConfig.newsletter_call_to_action ===
                            "add_to_database_and_mailchimp"
                          }
                          disabled={
                            newsletterConfig.mailchimp_api_key === "" ||
                            newsletterConfig.mailchimp_audience_id === ""
                          }
                          onChange={() => {
                            handleFieldChange({
                              field: "newsletter_call_to_action",
                              value: "add_to_database_and_mailchimp",
                            });
                          }}
                        />
                        <span className="absolute bg-accent-text w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                      </label>
                      <label
                        data-active={
                          newsletterConfig.mailchimp_api_key !== "" &&
                          newsletterConfig.mailchimp_audience_id !== ""
                        }
                        onClick={(e) => {
                          const isActive =
                            e.currentTarget.dataset.active === "true";

                          if (!isActive) {
                            ToastError({
                              message: "Add mailchimp info first.",
                            });
                          }
                        }}
                        className="data-[active=true]:text-primary-text text-primary-text/60 cursor-pointer text-sm"
                        htmlFor="on"
                      >
                        Add to database and mailchimp
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            preview ? "flex" : "hidden"
          } lg:flex z-[49] bg-primary-bg lg:bg-transparent lg:z-10 w-full bg-darkbg rounded-lg p-6 lg:p-4 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-[calc(50%-31px)] lg:translate-x-0 lg:translate-y-0 lg:static lg:right-auto lg:top-auto lg:w-[45%] h-[calc(100vh-60px)] lg:h-[85vh]`}
        >
          <p
            onClick={() => setPreview(false)}
            className="block lg:hidden absolute top-3 right-3 text-primary-text cursor-pointer"
          >
            <X />
          </p>
          <div className="scale-90 md:scale-100 relative mx-auto border-black dark:border-black bg-black border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[130px] h-[18px] bg-black top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="w-[90px] h-[5px] bg-gray-400 bottom-0.5 z-50 rounded-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-0.5 left-[17%] -translate-x-1/2 absolute">
              9:41
            </div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-[0.3rem] left-[85%] -translate-x-1/2 absolute">
              <BatteryLow size={15} />
            </div>
            <div className="w-[30] h-[18px] text-primarytext text-xs top-0.5 left-[78%] -translate-x-1/2 absolute">
              <SignalMedium size={15} />
            </div>
            <div className="h-[46px] w-[5px] bg-black absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[5px] bg-black absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[5px] bg-black absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="h-[10px] w-[10px] bg-white/10 absolute top-0 left-[40%] -translate-x-1/2 rounded-full"></div>
            <div className="h-[5px] w-[5px] bg-white/20 absolute top-[2.5px] left-[40%] -translate-x-1/2 rounded-full"></div>
            <div className="h-[10px] w-[50px] bg-white/10 absolute top-0 left-[53%] -translate-x-1/2 rounded-full"></div>
            {fetchLoading ? (
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-primary-bg flex items-center justify-center">
                <Loader strokeWidth={1.5} size={24} className="animate-spin" />
              </div>
            ) : (
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-black">
                <div className="bg-primary-bg/80 w-[272px] h-[572px]"></div>
                <div className="absolute top-4 left-0 w-full h-full p-4">
                  <div className="flex items-center justify-center">
                    <div className="bg-secondary-bg w-[50px] h-[50px] rounded-full p-1 border border-secondary-border object-cover"></div>
                    <div className="ml-3">
                      <div className="bg-secondary-bg h-[18px] w-[110px] rounded-sm border border-secondary-border"></div>
                      <div className="flex items-center text-primary-text text-sm mt-1">
                        <div className="bg-secondary-bg h-[12px] w-[40px] rounded-sm border border-secondary-border"></div>
                        <div className="ml-1 h-3 border-l border-secondary-strongerborder mr-1 "></div>
                        <span className="bg-secondary-bg h-[12px] w-[50px] rounded-sm border border-secondary-border"></span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <div className="bg-secondary-bg h-[18px] w-[40px] rounded-[0.1875rem] border border-secondary-border"></div>
                    <div className="bg-secondary-bg h-[18px] w-[50px] rounded-[0.1875rem] border border-secondary-border"></div>
                    <div className="bg-secondary-bg h-[18px] w-[30px] rounded-[0.1875rem] border border-secondary-border"></div>
                    <div className="bg-secondary-bg h-[18px] w-[40px] rounded-[0.1875rem] border border-secondary-border"></div>
                  </div>
                  <div className="w-full flex items-center justify-center ">
                    <div className="bg-secondary-bg h-[40px] w-[95%] mt-2 rounded-[0.1875rem] border border-secondary-border"></div>
                  </div>
                  <div className="mt-4 border-t border-secondary-border"></div>
                  <div className="mt-4">
                    <div className="bg-secondary-bg border border-secondary-border  h-[18px] w-60 rounded-[0.1875rem]"></div>
                    <div className="w-60 h-16 border border-secondary-border rounded-md mt-2 bg-secondary-bg transition-all ease-out duration-200"></div>
                    <div className="w-60 h-20 border border-secondary-border rounded-md mt-2 bg-secondary-bg transition-all ease-out duration-200"></div>{" "}
                  </div>
                  <div className="mt-4 border-t border-secondary-border"></div>
                  <p className="mt-4 text-center text-xs text-primary-text font-medium">
                    {newsletterConfig.newsletter_title}
                  </p>
                  <div className="flex items-center justify-center relative w-full mt-3">
                    <span className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center">
                      <Mail
                        strokeWidth={1}
                        size={17}
                        className="text-primary-text/80 text-xl"
                      />
                    </span>
                    <input
                      type="text"
                      name="full_name"
                      value=""
                      readOnly
                      placeholder="email@email.com"
                      className="border-secondary-border border-r-0  w-full py-2 pl-8 text-sm bg-secondary-bg border focus:outline-none rounded-l-md"
                    />
                    <button className="cursor-pointer py-2 px-3 text-sm rounded-r-md border border-secondary-border bg-secondary-selection text-primary-text">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsletterForm;
