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

namespace AppBundle\Validator\Middleware;

/**
 * Simple value object containing information about the validation.
 *
 * @author Maximilian Bosch <maximilian.bosch.27@gmail.com>
 */
final class ValidationInfo
{
    /**
     * @var \Symfony\Component\Validator\ConstraintViolationListInterface
     */
    public $violationList;

    /**
     * @var string[]
     */
    public $extra = [];

    /**
     * Checks if everything is valid.
     *
     * @return bool
     */
    public function isValid(): bool
    {
        return empty($this->violationList) || count($this->violationList) === 0;
    }

    /**
     * Getter for extra parameters.
     *
     * @param string $info
     * @param bool   $optional
     *
     * @throws \InvalidArgumentException If a non-optional attribute is missing.
     *
     * @return string|null
     */
    public function getExtraValue(string $info, bool $optional = false)
    {
        if (!array_key_exists($info, $this->extra)) {
            if (!$optional) {
                throw new \InvalidArgumentException(sprintf(
                    'Missing property "%s" in extra data!',
                    $info
                ));
            }

            return;
        }

        return $this->extra[$info];
    }
}
