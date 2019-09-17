<?
    $menu = [
        [
            'name' => 'Lorem ipsum.',
            'href' => ''
        ],
        [
            'name' => 'Incidunt, saepe!',
            'href' => ''
        ],
        [
            'name' => 'Accusantium, at!',
            'href' => ''
        ],
        [
            'name' => 'Perferendis, vitae!',
            'href' => ''
        ]
    ];
?>

<nav class="menu">
    <ul class="menu__list">
        <? foreach ($menu as $item): ?>
        <li class="menu__item"><a href="<?= $item['href']; ?>" class="menu__link"><?= $item['name']; ?></a></li>
        <? endforeach; ?>
    </ul>
</nav>