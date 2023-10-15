// "use client";
// import React, { useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
// import AppContext from "./AppContext";
// import AppReducer from "./AppReducer";
// import throttle from "lodash.throttle";
// import SupabaseContext from "../SupabaseContext/SupabaseContext";
// import { ActiveList, setOpenedChat } from "./types.d";
// import { Type } from "./types.d";
// import { initialState } from "./initialState";
// import { supabase } from "@/utils/supabase";
// import { RealtimeChannel } from "@supabase/realtime-js";
// import { usePathname } from "next/navigation";
// import { Post } from "../types";
// let userId: { payload: string | undefined };

// export const AppProvider = ({ children }: { children: React.ReactNode }) => {
//     const { getChats, session, profile, getMessages, updateLastSeen, sendMessageToChat, getChatRooms, sendImageToChat } = useContext(SupabaseContext);
//     const [state, dispatch] = useReducer(AppReducer, initialState);
//     const [isTyping, setIsTyping] = useState(false);
//     const [showScrollArrow, setShowScrollArrow] = useState(false);
//     const channelTypingRef = useRef<RealtimeChannel | undefined>();
//     const path = usePathname();

//     // const scrollRef = useRef<HTMLDivElement | null>();
//     const onScroll = ({ target }: any) => {
//         if (state.openedChat.messages?.length === 0) return;

//         if (target.scrollHeight - target.scrollTop >= target.clientHeight + 150) {
//             setShowScrollArrow(true);
//         } else {
//             setShowScrollArrow(false);
//         }

//         target.scrollTop = 1;
//     };

//     // useEffect(() => {

//     //     const hideTextTypingIndicator = () => {
//     //         setTimeout(() => {

//     //         }, 2000);
//     //     };

//     //     const onTyping = (payload: any) => {
//     //         userId = payload;
//     //         console.log(userId);

//     //         if (userId.payload === state.openedChat.profile?.id) {

//     //             hideTextTypingIndicator();
//     //             console.log("esta escribiendo");
//     //         }
//     //     };

//     //     channelTyping.on("broadcast", { event: "typing" }, onTyping).subscribe();

//     //     channelTypingRef.current = channelTyping;

//     //     return () => {
//     //         supabase.removeChannel(channelTyping);
//     //     };
//     // }, [profile, state.openedChat, setIsTyping]);

//     // const onTyPingEvent = throttle(() => {
//     //     if (!channelTypingRef.current) return;
//     //     if (isTyping) return;

//     //     channelTypingRef.current.send({
//     //         type: "broadcast",
//     //         event: "typing",
//     //         payload: profile?.id,
//     //     });
//     // }, 3000);

//     // const scrollToBottom = () => {
//     //     if (!scrollRef.current) return;
//     //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     // };

//     // const sendTypingEvent = useCallback(() => {
//     //     onTyPingEvent();
//     // }, [onTyPingEvent]);

// //     return (
// //         <AppContext.Provider
// //             value={{
// //                 state,
// //                 isTyping,
// //                 onScroll,
// //                 scrollRef,
// //                 showScrollArrow,
// //             }}
// //         >
// //             {children}
// //         </AppContext.Provider>
// //     );
// // };

// // const handleFocus = useCallback(() => {
// //     updateLastSeen("en linea", profile?.id);
// //     console.log("en linea");
// // }, [updateLastSeen]);

// // const handleBlur = useCallback(() => {
// //     updateLastSeen(`ult. vez a las ${formatDate(new Date(), "status")}`, profile?.id);
// //     console.log("no esta en linea");
// // }, [updateLastSeen]);

// // useEffect(() => {
// //     if (!session || !profile) {
// //         return;
// //     }
// //     const channel = supabase
// //         .channel("test", {
// //             config: {
// //                 presence: {
// //                     key: profile?.id,
// //                 },
// //             },
// //         })
// //         .on("presence", { event: "sync" }, () => {
// //             const usersList: ActiveList = channel.presenceState();
// //             setActiveUserList(usersList);
// //         })

// //         .subscribe(async status => {
// //             if (status === "SUBSCRIBED") {
// //                 const status = await channel.track({
// //                     id: profile?.id,
// //                     last_seen: profile?.last_seen,
// //                     email: profile?.email,
// //                     status: profile.status,
// //                     profile_picture: profile?.profile_picture,
// //                 });

// //                 console.log(status);
// //             }
// //         });

// //     window.addEventListener("focus", handleFocus);
// //     window.addEventListener("blur", handleBlur);

// //     return () => {
// //         window.removeEventListener("focus", handleFocus);
// //         window.removeEventListener("blur", handleBlur);
// //         supabase.removeChannel(channel);
// //         channel.untrack();
// //     };
// // }, [session, profile, updateLastSeen]);

// // useEffect(() => {
// //     if (!session || !profile) {
// //         return;
// //     }
// //     const { openedChat } = state;
// //     const profileChannelSubscription = supabase
// //         .channel("test:profile")
// //         .on(
// //             "postgres_changes",
// //             {
// //                 schema: "public",
// //                 event: "UPDATE",
// //                 filter: `id=eq.${state.openedChat?.profile?.id}`,
// //                 table: "profiles",
// //             },
// //             ({ new: user }) => {
// //                 const chat = state.chats.find(({ profile }) => user);
// //                 const isOpenedChat = state.openedChat && state.openedChat.profile?.id === chat?.profile.id;

// //                 updateChats({
// //                     ...chat,
// //                     ...(isOpenedChat && {
// //                         profile: {
// //                             ...openedChat.profile,
// //                             last_seen: user.last_seen,
// //                         },
// //                     }),
// //                 });
// //             }
// //         )
// //         .subscribe();

// //     return () => {
// //         supabase.removeChannel(profileChannelSubscription);
// //     };
// // }, [state.openedChat])
