# 路由跳转怎么处理
/config/config.ts 
/src/layouts/BlankLayout.jsx(Layout,children)

/src/layouts/BasicLayout.jsx(Layout,children)
	/src/utils/Authorized.js
		import RenderAuthorize from "@/components/Authorized"
		RenderAuthorize = renderAuthorize(Authorized);
										Authorized= {Secured,check}

<BlankLayout><UserLayout>

<SelectLang><HeaderDropdown overlay={langMenu} placement="bottomRight">

  const langMenu = (
    <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
      {locales.map(locale => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </Menu>
  );

  selectedLang
  const selectedLang = getLocale();