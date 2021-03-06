<?php

/*
 * This file is part of the Sententiaregum project.
 *
 * (c) Maximilian Bosch <maximilian.bosch.27@gmail.com>
 * (c) Ben Bieler <benjaminbieler2014@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare(strict_types=1);

namespace AppBundle\Model\User\Util\NameSuggestion;

use AppBundle\Model\User\Util\NameSuggestion\Suggestor\SuggestorInterface;

/**
 * Chainable suggestion strategy.
 *
 * @author Maximilian Bosch <maximilian.bosch.27@gmail.com>
 */
interface ChainSuggestorInterface extends SuggestorInterface
{
    /**
     * Adds a new suggestor.
     *
     * @param SuggestorInterface $suggestor
     *
     * @return ChainSuggestorInterface
     */
    public function register(SuggestorInterface $suggestor);
}
