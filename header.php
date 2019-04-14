<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
	<link rel="pingback" href="<?php echo esc_url( get_bloginfo( 'pingback_url' ) ); ?>">
	<?php endif; ?>
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div id="page" class="site">
	<div class="site-inner App">
		<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'twentysixteen' ); ?></a>

        <header class="App-header">
            <a title="home" href="/">
                <img class="AppLogo" src="<?=get_stylesheet_directory_uri()?>/images/wonderolie-logo.svg">
            </a>
            <h1 class="HeaderTeaser">passionate frontend developer</h1>
                <div class="site-header-main">
                    <?php if ( has_nav_menu( 'primary' ) || has_nav_menu( 'social' ) ) : ?>
                            <?php if ( has_nav_menu( 'primary' ) ) : ?>
                                <nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'twentysixteen' ); ?>">
                                    <?php
                                    wp_nav_menu(
                                        array(
                                            'theme_location' => 'primary',
                                            'menu_class' => 'primary-menu',
                                        )
                                    );
                                    ?>
                                </nav><!-- .main-navigation -->
                            <?php endif; ?>

                            <?php if ( has_nav_menu( 'social' ) ) : ?>
                                <nav id="social-navigation" class="social-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Social Links Menu', 'twentysixteen' ); ?>">
                                    <?php
                                    wp_nav_menu(
                                        array(
                                            'theme_location' => 'social',
                                            'menu_class'  => 'social-links-menu',
                                            'depth'       => 1,
                                            'link_before' => '<span class="screen-reader-text">',
                                            'link_after'  => '</span>',
                                        )
                                    );
                                    ?>
                                </nav><!-- .social-navigation -->
                            <?php endif; ?>
                        </div><!-- .site-header-menu -->
                    <?php endif; ?>
                </div><!-- .site-header-main -->
        </header>
		<div id="content" class="site-content">
