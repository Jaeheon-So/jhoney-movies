"use client";

declare global {
  interface Window {
    workbox: any;
  }
}

import { useModalStore } from "@/store/confirmModal";
import { useEffect } from "react";
import { notify } from "./Toast";

export function PWALifeCycle() {
  // This hook only run once in browser after the component is rendered for the first time.
  // It has same effect as the old componentDidMount lifecycle callback.
  const { openModal, closeModal } = useModalStore();

  const checkUpdate = (wb: any) => {
    openModal({
      title: "업데이트",
      content: (
        <div>
          Honey Box의 최신 버전을 사용할 수 있습니다.
          <br />
          업데이트를 진행하시겠습니까?
        </div>
      ),
      confirmCallback: async () => {
        closeModal();
        wb.messageSkipWaiting();
        wb.addEventListener("controlling", () => {
          window.location.reload();
        });
      },
      cancelCallback: () => {
        closeModal();
        notify({
          type: "success",
          content:
            "이전 버전을 유지합니다. 다음에 앱을 열면 새 버전이 자동으로 로드됩니다.",
        });
      },
    });
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox;
      // // add event listeners to handle PWA lifecycle events
      wb.addEventListener("installed", (event: any) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
        notify({
          type: "success",
          content: "Honey Box가 새로운 버전으로 업데이트 되었습니다.",
        });
      });

      // wb.addEventListener("waiting", () => {
      //   // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
      //   // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
      //   // You may want to customize the UI prompt accordingly.
      //   // https://developer.chrome.com/docs/workbox/handling-service-worker-updates/#the-code-to-put-in-your-page
      //   if (
      //     confirm(
      //       "A newer version of this web app is available, reload to update?"
      //     )
      //   ) {
      //     // Send a message to the waiting service worker, instructing it to activate.
      //     wb.messageSkipWaiting();
      //     wb.addEventListener("controlling", () => {
      //       window.location.reload();
      //     });
      //   } else {
      //     alert(
      //       "User rejected to update SW, keeping the old version. New version will be automatically loaded when the app is opened next time."
      //     );
      //     console.log(
      //       "User rejected to update SW, keeping the old version. New version will be automatically loaded when the app is opened next time."
      //     );
      //   }
      // });

      // // wb.addEventListener("waiting", () => checkUpdate(wb));

      // wb.addEventListener("controlling", (event: any) => {
      //   console.log(`Event ${event.type} is triggered.`);
      //   console.log(event);
      // });

      wb.addEventListener("activated", (event: any) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
        event.waitUntil(wb.clientsClaim());
      });

      // // Don't forget to call register as automatic registration is disabled.
      // wb.register();

      const showSkipWaitingPrompt = async (event: any) => {
        // Assuming the user accepted the update, set up a listener
        // that will reload the page as soon as the previously waiting
        // service worker has taken control.
        wb.addEventListener("controlling", () => {
          // At this point, reloading will ensure that the current
          // tab is loaded under the control of the new service worker.
          // Depending on your web app, you may want to auto-save or
          // persist transient state before triggering the reload.
          console.log("controll");
          window.location.reload();
        });

        // When `event.wasWaitingBeforeRegister` is true, a previously
        // updated service worker is still waiting.
        // You may want to customize the UI prompt accordingly.

        // This code assumes your app has a promptForUpdate() method,
        // which returns true if the user wants to update.
        // Implementing this is app-specific; some examples are:
        // https://open-ui.org/components/alert.research or
        // https://open-ui.org/components/toast.research
        // const updateAccepted = confirm(
        //   "A newer version of this web app is available, reload to update?"
        // );

        if (
          confirm(
            "A newer version of this web app is available, reload to update?"
          )
        ) {
          console.log("accepted");
          wb.messageSkipWaiting();
        }
      };

      // Add an event listener to detect when the registered
      // service worker has installed but is waiting to activate.
      wb.addEventListener("waiting", (event: any) => {
        console.log("waiting");
        showSkipWaitingPrompt(event);
      });

      wb.register();
    }
  }, []);
  return <></>;
}
