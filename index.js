const tabsAccordion = document.querySelectorAll(".accordion__tab");
const tabsContainer = document.getElementById("tabs-container");

function selectAccordion(tab) {
  const tabSelected = tab.getAttribute("aria-selected");
  const tabPanelId = tab.getAttribute("aria-controls");
  const panel = document.getElementById(tabPanelId);

  const previousTab = document.querySelector(
    '.accordion [aria-selected="true"]'
  );

  if (previousTab && tabSelected == "false") {
    const tabPreviousPanelId = previousTab.getAttribute("aria-controls");
    const previousPanel = document.getElementById(tabPreviousPanelId);
    previousTab.setAttribute("aria-selected", false);
    previousTab.children[1].removeAttribute("hidden");
    previousTab.children[2].setAttribute("hidden", true);
    previousPanel.style.maxHeight = null;
  }

  if (tabSelected == "true") {
    tab.setAttribute("aria-selected", false);
    panel.style.maxHeight = null;
    tab.children[1].removeAttribute("hidden");
    tab.children[2].setAttribute("hidden", true);
    return;
  }

  tab.setAttribute("aria-selected", true);
  panel.style.maxHeight = panel.scrollHeight + 50 + "px";
  tab.children[1].setAttribute("hidden", true);
  tab.children[2].removeAttribute("hidden");
}

tabsAccordion.forEach((tab) => {
  tab.addEventListener("click", () => selectAccordion(tab));

  tab.addEventListener("keydown", (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) selectAccordion(tab);
  });
});

let i = 0;
tabsContainer.addEventListener("keydown", (e) => {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabsAccordion[i].setAttribute("tabindex", -1);

    if (e.keyCode === keydownRight) {
      i++;
      if (i >= tabsAccordion.length) i = 0;
    } else {
      i--;
      if (i < 0) i = tabsAccordion.length - 1;
    }

    tabsAccordion[i].setAttribute("tabindex", 0);
    tabsAccordion[i].focus();
  }
});
